import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, count } from 'drizzle-orm';

/**
 * Ensures the current authenticated Clerk user exists in the local database.
 * If the user doesn't exist, it creates a new record for them.
 * Returns the local user ID.
 */
export async function ensureUser() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        throw new Error('User not authenticated');
    }

    // Check if user exists in local DB
    const [existingUser] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, clerkUser.id))
        .limit(1);

    if (!existingUser) {
        // Create user if they don't exist
        // Enforce Beta Limit (50 users)
        const [userCount] = await db.select({ count: count() }).from(users);
        const status = userCount.count >= 50 ? 'waitlist' : 'active';

        await db.insert(users).values({
            id: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
            image: clerkUser.imageUrl || null,
            status: status, // active or waitlist
        });
        console.log(`[USER] Created new local record for Clerk user: ${clerkUser.id} with status: ${status}`);
    }

    return clerkUser.id;
}
