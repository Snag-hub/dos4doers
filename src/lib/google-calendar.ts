import { google } from 'googleapis';

export const googleCalendar = google.calendar('v3');

export interface GoogleCalendar {
    id: string;
    summary: string;
    backgroundColor?: string;
}

/**
 * List all accessible calendars for the authenticated user
 */
export async function listCalendars(accessToken: string): Promise<GoogleCalendar[]> {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    try {
        const response = await googleCalendar.calendarList.list({
            auth: oauth2Client,
            minAccessRole: 'reader', // Only include calendars user can read
        });

        return (response.data.items || []).map(cal => ({
            id: cal.id || 'primary',
            summary: cal.summary || 'Calendar',
            backgroundColor: cal.backgroundColor ?? undefined,
        }));
    } catch (error) {
        console.error('Error listing calendars:', error);
        return [];
    }
}

export async function getCalendarEvents(
    accessToken: string,
    timeMin: string,
    timeMax: string,
    calendarId: string = 'primary'
) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await googleCalendar.events.list({
        auth: oauth2Client,
        calendarId: calendarId,
        timeMin: timeMin,
        timeMax: timeMax,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return response.data.items || [];
}

export async function createCalendarEvent(accessToken: string, event: any) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await googleCalendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: event,
    });

    return response.data;
}
