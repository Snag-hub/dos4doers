import { db } from '@/db';
import { items, reminders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { action, itemId, reminderId, type } = await request.json();

        // Support both field names for compatibility
        const id = itemId || reminderId;

        if (!action || !id) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        console.log(`🔔 [PUSH ACTION] ${action} on ${type} ${id}`);

        if (action === 'snooze') {
            // Snooze for 1 hour
            const newTime = new Date(Date.now() + 60 * 60 * 1000);

            if (type === 'reminder') {
                await db.update(reminders)
                    .set({ scheduledAt: newTime, lockedAt: null })
                    .where(eq(reminders.id, id));
            } else if (type === 'item') {
                await db.update(items)
                    .set({ reminderAt: newTime, lockedAt: null })
                    .where(eq(items.id, id));
            }

        } else if (action === 'mark-read') {
            if (type === 'reminder') {
                const reminder = await db.query.reminders.findFirst({
                    where: eq(reminders.id, id)
                });

                if (reminder && reminder.recurrence && reminder.recurrence !== 'none') {
                    // Calculate next date based on original scheduled time to maintain "time of day"
                    let nextDate = new Date(reminder.scheduledAt);
                    const now = new Date();

                    while (nextDate <= now) {
                        if (reminder.recurrence === 'daily') {
                            nextDate.setDate(nextDate.getDate() + 1);
                        } else if (reminder.recurrence === 'weekly') {
                            nextDate.setDate(nextDate.getDate() + 7);
                        } else if (reminder.recurrence === 'monthly') {
                            nextDate.setMonth(nextDate.getMonth() + 1);
                        } else {
                            break;
                        }
                    }

                    await db.update(reminders)
                        .set({ scheduledAt: nextDate, lockedAt: null })
                        .where(eq(reminders.id, id));

                    console.log(`🔁 [PUSH ACTION] Rescheduled recurring reminder ${id} to ${nextDate.toISOString()}`);
                } else {
                    await db.delete(reminders).where(eq(reminders.id, id));
                }
            } else if (type === 'item') {
                await db.update(items)
                    .set({ read: true, reminderAt: null, lockedAt: null }) // clear reminder too
                    .where(eq(items.id, id));
            }

        } else if (action === 'delete') {
            if (type === 'reminder') {
                await db.delete(reminders).where(eq(reminders.id, id));
            } else if (type === 'item') {
                // Should we delete the item or just the reminder?
                // "Delete" usually implies full deletion.
                await db.delete(items).where(eq(items.id, id));
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Push action failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
