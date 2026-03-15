import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { count, eq } from 'drizzle-orm';

const MAX_BETA_USERS = 50;

export async function checkBetaAccess() {
    const { userId } = await auth();
    if (!userId) return;

    let dbUser: { status: 'active' | 'waitlist' } | undefined;

    try {
        const result = await db
            .select({ status: users.status })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        dbUser = result[0] as { status: 'active' | 'waitlist' } | undefined;
    } catch (error) {
        console.error('[BETA] Failed to load user status:', error);
        return;
    }

    if (!dbUser) {
        // User not synced to DB yet - this might happen on first load before webhook
        // For safety, let's sync or wait. 
        // In this simple implementation, we'll optimistically continue or check syncing.
        // But practically, if we can't find them, we can't gate them properly.
        return;
    }

    if (dbUser.status === 'active') {
        return; // All good
    }

    if (dbUser.status === 'waitlist') {
        redirect('/waitlist');
    }
}

export async function enforceBetaLimit(userId: string, email: string) {
    let existingUser: { id: string } | undefined;
    try {
        const result = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);
        existingUser = result[0];
    } catch (error) {
        console.error('[BETA] Failed to check existing user:', error);
        return;
    }

    if (existingUser) return; // Already processed

    // Count existing active users
    const [userCount] = await db.select({ count: count() }).from(users);

    const status = userCount.count >= MAX_BETA_USERS ? 'waitlist' : 'active';

    try {
        await db.insert(users).values({
            id: userId,
            email: email,
            status: status,
        });
    } catch (error) {
        console.error('[BETA] Failed to create user during beta enforcement:', error);
    }
}
