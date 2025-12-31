import { google } from 'googleapis';

export const googleCalendar = google.calendar('v3');

export async function getCalendarEvents(accessToken: string, timeMin: string, timeMax: string) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await googleCalendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
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
