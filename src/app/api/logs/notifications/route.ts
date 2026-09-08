
import { db } from '@/db';
import { notificationLogs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getUserId } from '@/lib/auth';

export async function GET() {
    const userId = await getUserId();
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const logs = await db
            .select()
            .from(notificationLogs)
            .where(eq(notificationLogs.userId, userId))
            .orderBy(desc(notificationLogs.createdAt))
            .limit(50); // Limit to last 50 logs for now

        return NextResponse.json(logs);
    } catch (error) {
        console.error('Failed to fetch notification logs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
