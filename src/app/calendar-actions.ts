'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db';
import { meetings } from '@/db/schema';
import { getCalendarEvents, listCalendars } from '@/lib/google-calendar';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function syncGoogleCalendar() {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        const client = await clerkClient();

        // Get OAuth tokens for all connected Google accounts
        const tokens = await client.users.getUserOauthAccessToken(userId, 'oauth_google');

        if (tokens.data.length === 0) {
            return {
                success: false,
                message: 'No Google account connected. Please connect your Google account in User Profile.'
            };
        }

        let totalImported = 0;
        let totalCalendars = 0;
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        // Iterate over ALL connected Google accounts
        for (const tokenData of tokens.data) {
            try {
                const accessToken = tokenData.token;

                // Get account email from token data (if available)
                const accountEmail = tokenData.label || 'Google Account';

                // List all accessible calendars for this account
                const calendars = await listCalendars(accessToken);
                totalCalendars += calendars.length;

                // Sync events from each calendar
                for (const calendar of calendars) {
                    try {
                        const googleEvents = await getCalendarEvents(
                            accessToken,
                            timeMin,
                            timeMax,
                            calendar.id
                        );

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
                                provider: 'google' as const,
                                externalId: event.id,
                                type: 'general' as const,
                                // Calendar metadata
                                calendarId: calendar.id,
                                calendarName: calendar.summary,
                                calendarColor: calendar.backgroundColor,
                                accountEmail: accountEmail,
                            };

                            if (existing) {
                                // Update existing event
                                await db.update(meetings)
                                    .set({
                                        title: meetingData.title,
                                        description: meetingData.description,
                                        startTime: meetingData.startTime,
                                        endTime: meetingData.endTime,
                                        calendarId: meetingData.calendarId,
                                        calendarName: meetingData.calendarName,
                                        calendarColor: meetingData.calendarColor,
                                        accountEmail: meetingData.accountEmail,
                                        updatedAt: new Date(),
                                    })
                                    .where(eq(meetings.id, existing.id));
                            } else {
                                // Insert new event
                                await db.insert(meetings).values({
                                    id: crypto.randomUUID(),
                                    ...meetingData
                                });
                            }
                            totalImported++;
                        }
                    } catch (calErr) {
                        console.error(`Error syncing calendar ${calendar.summary}:`, calErr);
                        // Continue to next calendar
                    }
                }
            } catch (err) {
                console.error('Error syncing one of the accounts:', err);
                // Continue to next account
            }
        }

        revalidatePath('/timeline');
        return {
            success: true,
            message: `Successfully synced ${totalImported} events from ${totalCalendars} calendar(s) across ${tokens.data.length} account(s).`
        };

    } catch (error) {
        console.error('Calendar Sync Error:', error);
        return { success: false, message: 'Failed to sync calendar. ' + (error instanceof Error ? error.message : '') };
    }
}
