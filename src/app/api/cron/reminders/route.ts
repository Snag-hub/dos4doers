import { db } from '@/db';
import { items, users, pushSubscriptions, reminders, meetings } from '@/db/schema';
import { eq, and, lt, isNotNull, sql } from 'drizzle-orm';
import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { withNotificationLogging } from '@/lib/notification-logger';

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

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
        lt(items.reminderAt, now),
        // Either not locked, or lock expired
        sql`(${items.lockedAt} IS NULL OR ${items.lockedAt} < ${now})`
      ))
      .returning();

    // 2. ATOMIC CLAIM: Reminders
    const claimedReminders = await db
      .update(reminders)
      .set({ lockedAt: safetyLockTime })
      .where(and(
        lt(reminders.scheduledAt, now),
        sql`(${reminders.lockedAt} IS NULL OR ${reminders.lockedAt} < ${now})`
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
        title: 'DOs 4 DOERs: Time to read',
        body: item.title || item.url,
        url: '/inbox',
        itemId: item.id,
        type: 'item',
        userId: user.id,
      });

      for (const sub of subs) {
        await withNotificationLogging(user.id, 'push', sub.endpoint, async () => {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        }, { itemId: item.id });
      }
    }

    // 4. Process Reminders
    for (const reminder of claimedReminders) {
      const user = await db.query.users.findFirst({ where: eq(users.id, reminder.userId) });
      if (!user?.pushNotifications) continue;

      const subs = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, user.id));
      if (subs.length === 0) continue;

      let title = reminder.title || 'Reminder';
      let url = '/settings';

      if (reminder.meetingId) {
        const meeting = await db.query.meetings.findFirst({ where: eq(meetings.id, reminder.meetingId) });
        if (meeting) {
          title = `Meeting: ${meeting.title}`;
          url = '/meetings';
        }
      }

      const payload = JSON.stringify({
        title: 'DOs 4 DOERs',
        body: title,
        url: url,
        itemId: reminder.id, // Notification action handler uses itemId for reminderId too
        type: 'reminder',
        userId: user.id,
      });

      for (const sub of subs) {
        await withNotificationLogging(user.id, 'push', sub.endpoint, async () => {
          await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        }, { reminderId: reminder.id });
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

