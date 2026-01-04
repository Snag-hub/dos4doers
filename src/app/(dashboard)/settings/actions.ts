'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function generateApiToken(userId: string) {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId || clerkUserId !== userId) {
        throw new Error('Unauthorized');
    }

    const newToken = uuidv4();

    await db
        .update(users)
        .set({ apiToken: newToken })
        .where(eq(users.id, userId));

    revalidatePath('/settings');
    return newToken;
}

export async function deleteAccount() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }

    try {
        // 1. Delete from Clerk (Auth)
        // We do this first or parallel. If it fails, we shouldn't delete local data 
        // ideally, but for personal tools, ensuring local deletion is key too.
        // Let's try Clerk first.
        const client = await clerkClient();
        await client.users.deleteUser(userId);

        // 2. Delete from Database (Cascade will handle related data)
        // Note: verified users table has onDelete: cascade for everything else
        await db.delete(users).where(eq(users.id, userId));

        return { success: true };
    } catch (error) {
        console.error('Delete account error:', error);
        throw new Error('Failed to delete account');
    }
}
