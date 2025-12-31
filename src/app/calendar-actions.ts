'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db';
import { meetings } from '@/db/schema';
import { getCalendarEvents } from '@/lib/google-calendar';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function syncGoogleCalendar() {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        const client = await clerkClient();

        // Get OAuth token
        // strategies: 'oauth_google'
        const tokens = await client.users.getUserOauthAccessToken(userId, 'oauth_google');

        if (tokens.data.length === 0) {
            return {
                success: false,
                message: 'No Google account connected. Please connect your Google account in User Profile.'
            };
        }

        let totalImported = 0;
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        // Iterate over ALL connected Google accounts
        for (const tokenData of tokens.data) {
            try {
                const accessToken = tokenData.token;
                const googleEvents = await getCalendarEvents(accessToken, timeMin, timeMax);

                for (const event of googleEvents) {
                    // Skip cancelled events or events without start/end or ID
                    if (event.status === 'cancelled' || !event.start?.dateTime || !event.id) continue;

                    const existing = await db.query.meetings.findFirst({
                        where: eq(meetings.externalId, event.id)
                    });

                    // Safe end time fallback
                    const endTime = event.end?.dateTime
                        ? new Date(event.end.dateTime)
                        : new Date(new Date(event.start.dateTime).getTime() + 60 * 60 * 1000); // Default 1h if missing

                    const meetingData = {
                        userId,
                        title: event.summary || '(No Title)',
                        description: event.description || null,
                        link: event.htmlLink,
                        startTime: new Date(event.start.dateTime),
                        endTime: endTime,
                        provider: 'google',
                        externalId: event.id,
                        type: 'general' as const,
                    };

                    if (existing) {
                        // Update
                        await db.update(meetings)
                            .set({
                                title: meetingData.title,
                                description: meetingData.description,
                                startTime: meetingData.startTime,
                                endTime: meetingData.endTime,
                                updatedAt: new Date(),
                            })
                            .where(eq(meetings.id, existing.id));
                    } else {
                        // Insert
                        await db.insert(meetings).values({
                            id: crypto.randomUUID(),
                            ...meetingData
                        });
                    }
                    totalImported++;
                }
            } catch (err) {
                console.error('Error syncing one of the accounts:', err);
                // Continue to next account
            }
        }

        revalidatePath('/timeline');
        return { success: true, message: `Successfully synced ${totalImported} events from ${tokens.data.length} Google account(s).` };

    } catch (error) {
        console.error('Calendar Sync Error:', error);
        return { success: false, message: 'Failed to sync calendar. ' + (error instanceof Error ? error.message : '') };
    }
}
