import { NextResponse } from 'next/server';
import { db } from '@/db';
import { items } from '@/db/schema';
import { eq, lt, and } from 'drizzle-orm';

export async function GET(req: Request) {
    // Simple auth check via secret header to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // 1. Delete items that have been in 'trash' for more than 30 days
        const deletedItems = await db.delete(items)
            .where(and(
                eq(items.status, 'trash'),
                lt(items.updatedAt, thirtyDaysAgo)
            ))
            .returning({ id: items.id });

        return NextResponse.json({
            success: true,
            deletedItemsCount: deletedItems.length,
            message: `Cleaned ${deletedItems.length} trashed item(s).`
        });
    } catch (error) {
        console.error('Database cleanup failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
