import { db } from '@/db';
import { reminders } from '@/db/schema';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { rateLimit } from '@/lib/rate-limit';
import { getUserIdFromBearerToken } from '@/lib/api-token';

// CORS headers for browser extension
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
    try {
        const userId = await getUserIdFromBearerToken(request);
        if (!userId) {
            return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401, headers: corsHeaders });
        }

        // Rate Limiting (3 requests per minute per user)
        const { success: rateSuccess } = await rateLimit(`api:createReminder:${userId}`, 3);
        if (!rateSuccess) {
            return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429, headers: corsHeaders });
        }

        const body = await request.json();
        const { title, scheduledAt, recurrence } = body;

        if (!title || typeof title !== 'string' || title.length > 500) {
            return NextResponse.json({ error: 'Title is required (max 500 chars)' }, { status: 400, headers: corsHeaders });
        }

        const allowedRecurrence = ['none', 'daily', 'weekly', 'monthly'];
        if (recurrence !== undefined && !allowedRecurrence.includes(recurrence)) {
            return NextResponse.json({ error: 'Invalid recurrence value' }, { status: 400, headers: corsHeaders });
        }

        // Validate date
        const date = new Date(scheduledAt);
        if (isNaN(date.getTime())) {
            return NextResponse.json({ error: 'Invalid date' }, { status: 400, headers: corsHeaders });
        }

        const newReminder = {
            id: uuidv4(),
            userId,
            itemId: null, // General reminder
            title,
            scheduledAt: date,
            recurrence: (recurrence || 'none') as 'none' | 'daily' | 'weekly' | 'monthly',
        };

        await db.insert(reminders).values(newReminder);

        return NextResponse.json({ success: true, reminder: newReminder }, { headers: corsHeaders });
    } catch (error) {
        console.error('Error creating reminder:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
    }
}
