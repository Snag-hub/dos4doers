import { db } from '@/db';
import { items, users, pushSubscriptions, reminders } from '@/db/schema';
import { eq, and, lt, lte, isNotNull, isNull, or, notExists } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { withNotificationLogging } from '@/lib/notification-logger';
import { isValidCronRequest } from '@/lib/cron-auth';

function getItemReminderTitle(item: { type: string; title: string | null; url: string }) {
  const prefix = item.type === 'video' ? 'Watch' : 'Read';
  return `${prefix}: ${item.title || item.url}`;
}

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    `mailto:${process.env.EMAIL_FROM || 'test@example.com'}`,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cronStartTime = Date.now();
  console.log(`🔔 [CRON] Reminder job started at ${new Date().toISOString()}`);

  if (!isValidCronRequest(req)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const now = new Date();
    const safetyLockTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour safety lock

    // 1. ATOMIC CLAIM: Items
    const claimedItems = await db
      .update(items)
      .set({ lockedAt: safetyLockTime })
      .where(and(
        isNotNull(items.reminderAt),
        lte(items.reminderAt, now),
        // Item reminders created by the scheduler also have a matching row in
        // `reminders`. That row is the source of truth, so don't send twice.
        notExists(
          db.select({ id: reminders.id })
            .from(reminders)
            .where(eq(reminders.itemId, items.id))
        ),
        // Either not locked, or lock expired
        or(isNull(items.lockedAt), lt(items.lockedAt, now))
      ))
      .returning();

    // 2. ATOMIC CLAIM: Reminders
    const claimedReminders = await db
      .update(reminders)
      .set({ lockedAt: safetyLockTime })
      .where(and(
        lte(reminders.scheduledAt, now),
        or(isNull(reminders.lockedAt), lt(reminders.lockedAt, now))
      ))
      .returning();

    if (claimedItems.length === 0 && claimedReminders.length === 0) {
      console.log(`✅ [CRON] No due reminders to process.`);
      return NextResponse.json({ success: true, processed: 0 });
    }

    console.log(`🔔 [CRON] Claimed ${claimedItems.length} items and ${claimedReminders.length} reminders.`);

    // 3. Process Items
    for (const item of claimedItems) {
      const user = await db.query.users.findFirst({ where: eq(users.id, item.userId) });
      if (!user?.pushNotifications) continue;

      const subs = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, user.id));
      if (subs.length === 0) continue;

      const payload = JSON.stringify({
        title: getItemReminderTitle(item),
        body: 'Reminder',
        url: '/inbox',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        itemId: item.id,
        type: 'item',
        userId: user.id,
      });

      for (const sub of subs) {
        await withNotificationLogging(user.id, 'push', sub.endpoint, async () => {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        }, { itemId: item.id });
      }

      // Legacy item reminders don't have a `reminders` record. Clear the due
      // timestamp after this delivery so the two-minute cron cannot resend it.
      await db.update(items)
        .set({ reminderAt: null, lockedAt: null })
        .where(eq(items.id, item.id));
    }

    // 4. Process Reminders
    for (const reminder of claimedReminders) {
      const user = await db.query.users.findFirst({ where: eq(users.id, reminder.userId) });
      if (!user?.pushNotifications) continue;

      const subs = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, user.id));
      if (subs.length === 0) continue;

      const reminderItem = reminder.itemId
        ? await db.query.items.findFirst({ where: eq(items.id, reminder.itemId) })
        : null;
      const isItemReminder = Boolean(reminder.itemId && reminderItem);
      const title = isItemReminder
        ? getItemReminderTitle(reminderItem!)
        : 'DOs 4 DOERs';
      const body = isItemReminder
        ? reminder.title || 'Reminder'
        : reminder.title || 'Reminder';
      const url = reminder.itemId ? '/inbox' : '/settings';

      const payload = JSON.stringify({
        title,
        body,
        url: url,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        itemId: reminder.id, // Notification action handler uses itemId for reminderId too
        type: 'reminder',
        userId: user.id,
      });

      for (const sub of subs) {
        await withNotificationLogging(user.id, 'push', sub.endpoint, async () => {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        }, { reminderId: reminder.id });
      }

      // Item reminders are also mirrored on the item for the inbox UI. Clear
      // that legacy timestamp before removing/rescheduling the reminder row so
      // it cannot be picked up as a separate notification on the next run.
      if (reminder.itemId) {
        await db.update(items)
          .set({ reminderAt: null, lockedAt: null })
          .where(eq(items.id, reminder.itemId));
      }

      // Handle recurrence or deletion
      if (reminder.recurrence === 'none') {
        // One-time reminder: delete after sending
        await db.delete(reminders).where(eq(reminders.id, reminder.id));
      } else {
        // Recurring reminder: calculate next occurrence and reschedule
        const { calculateNextOccurrence } = await import('@/lib/reminder-utils');
        const nextScheduledAt = calculateNextOccurrence(reminder.scheduledAt, reminder.recurrence, now);
        await db.update(reminders)
          .set({ scheduledAt: nextScheduledAt, lockedAt: null })
          .where(eq(reminders.id, reminder.id));

        if (reminder.itemId) {
          await db.update(items)
            .set({ reminderAt: nextScheduledAt, lockedAt: null })
            .where(eq(items.id, reminder.itemId));
        }
      }
    }


    const totalDuration = Date.now() - cronStartTime;
    console.log(`✅ [CRON] Completed in ${totalDuration}ms`);
    return NextResponse.json({ success: true, items: claimedItems.length, reminders: claimedReminders.length });

  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

