
import { db } from '@/db';
import { notificationLogs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const logs = await db
            .select()
            .from(notificationLogs)
            .where(eq(notificationLogs.userId, user.id))
            .orderBy(desc(notificationLogs.createdAt))
            .limit(50); // Limit to last 50 logs for now

        return NextResponse.json(logs);
    } catch (error) {
        console.error('Failed to fetch notification logs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
