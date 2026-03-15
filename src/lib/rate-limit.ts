import { db } from '@/db';
import { rateLimits } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * A database-backed rate limiter for server actions.
 * Ensures reliability across serverless instances/restarts.
 */
export async function rateLimit(key: string, limit: number = 10, windowMs: number = 60000) {
    const now = new Date();
    const futureReset = new Date(now.getTime() + windowMs);

    try {
        return await db.transaction(async (tx) => {
            const existingRows = await tx
                .select()
                .from(rateLimits)
                .where(eq(rateLimits.key, key))
                .limit(1);

            const existing = existingRows[0];

            if (!existing) {
                await tx.insert(rateLimits).values({
                    key,
                    count: 1,
                    reset: futureReset,
                });

                return {
                    success: true,
                    limit,
                    remaining: Math.max(0, limit - 1),
                    reset: futureReset.getTime(),
                };
            }

            const existingReset = existing.reset instanceof Date
                ? existing.reset
                : new Date(existing.reset as unknown as string);

            const withinNewWindow = existingReset.getTime() < now.getTime();
            const nextCount = withinNewWindow ? 1 : existing.count + 1;
            const nextReset = withinNewWindow ? futureReset : existingReset;

            await tx
                .update(rateLimits)
                .set({
                    count: nextCount,
                    reset: nextReset,
                })
                .where(eq(rateLimits.key, key));

            return {
                success: nextCount <= limit,
                limit,
                remaining: Math.max(0, limit - nextCount),
                reset: nextReset.getTime(),
            };
        });
    } catch (error) {
        console.error('[RATE_LIMIT] Failed, allowing request:', { key, error });
        return {
            success: true,
            limit,
            remaining: limit,
            reset: futureReset.getTime(),
        };
    }
}
