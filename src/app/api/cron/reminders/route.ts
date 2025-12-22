import { db } from '@/db';
import { items, users, pushSubscriptions } from '@/db/schema';
import { eq, and, lt, isNotNull } from 'drizzle-orm';
import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import webpush from 'web-push';

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
        `mailto:${process.env.EMAIL_FROM || 'test@example.com'}`,
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}

// Prevent vercel from caching this route forever
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const now = new Date();

        // 1. Find items with passed reminders
        // We join with 'users' to get the email address directly
        const dueItems = await db
            .select({
                itemId: items.id,
                title: items.title,
                url: items.url,
                userId: items.userId,
                email: users.email,
                name: users.name,
            })
            .from(items)
            .innerJoin(users, eq(items.userId, users.id))
            .where(
                and(
                    isNotNull(items.reminderAt),
                    lt(items.reminderAt, now)
                )
            );

        if (dueItems.length === 0) {
            return NextResponse.json({ message: 'No due reminders found.' });
        }

        console.log(`🔔 Found ${dueItems.length} due reminders.`);

        // 2. Group by User to send digested emails (optional optimization, but good for UX)
        // Structure: { [email]: { user: {name, email}, items: [...] } }
        const groupedByUser: Record<string, { name: string | null; email: string; items: typeof dueItems }> = {};

        for (const item of dueItems) {
            if (!groupedByUser[item.email]) {
                groupedByUser[item.email] = {
                    name: item.name,
                    email: item.email,
                    items: [],
                };
            }
            groupedByUser[item.email].items.push(item);
        }

        // 3. Send Emails & Clear Reminders
        const results = [];

        for (const email of Object.keys(groupedByUser)) {
            const userGroup = groupedByUser[email];

            // Simple HTML Template
            const itemsHtml = userGroup.items
                .map(
                    (item) => `
        <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">
            <a href="${item.url}" style="color: #2563eb; text-decoration: none;">${item.title || 'Untitled Item'}</a>
          </h3>
          <p style="margin: 0; font-size: 14px; color: #52525b;">Time to read!</p>
        </div>
      `
                )
                .join('');

            const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #18181b;">DayOS Reminder</h1>
          <p>Hi ${userGroup.name || 'there'}, you asked us to remind you about these items:</p>
          ${itemsHtml}
          <p style="margin-top: 24px; font-size: 12px; color: #a1a1aa;">
            These reminders have now been cleared. <a href="${process.env.NEXTAUTH_URL || 'https://dayos.app'}/inbox">Go to Inbox</a>
          </p>
        </div>
      `;

            // Send Email
            await sendEmail({
                to: email,
                subject: `You have ${userGroup.items.length} reminder${userGroup.items.length > 1 ? 's' : ''} due in DayOS`,
                html,
            });

            // 4. Send Push Notifications
            try {
                // Get user ID from the first item (all items in group belong to same user/email basically, assuming 1:1)
                const userId = userGroup.items[0].userId;

                const subs = await db
                    .select()
                    .from(pushSubscriptions)
                    .where(eq(pushSubscriptions.userId, userId));

                for (const sub of subs) {
                    try {
                        const payload = JSON.stringify({
                            title: `DayOS: ${userGroup.items.length} Reminder(s) Due`,
                            body: userGroup.items.map(i => i.title).join(', '),
                            url: '/inbox',
                        });

                        await webpush.sendNotification({
                            endpoint: sub.endpoint,
                            keys: { p256dh: sub.p256dh, auth: sub.auth }
                        }, payload);
                    } catch (err) {
                        console.error('Push failed for sub', sub.id, err);
                        // If 410 Gone, we should delete the subscription
                        // await db.delete(pushSubscriptions).where(eq(pushSubscriptions.id, sub.id));
                    }
                }
            } catch (error) {
                console.error('Failed to process push notifications', error);
            }

            // Clear reminders in DB for these specific items
            // Optimization: Could do bulk update where ID in [...]
            for (const item of userGroup.items) {
                await db
                    .update(items)
                    .set({ reminderAt: null })
                    .where(eq(items.id, item.itemId));
            }

            results.push({ email, count: userGroup.items.length });
        }

        return NextResponse.json({
            success: true,
            processed: results,
        });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
