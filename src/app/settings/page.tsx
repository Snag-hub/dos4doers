import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import SettingsClient from './client';
import Link from 'next/link';

export default async function SettingsPage() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        redirect('/');
    }

    let apiToken: string | null = null;

    try {
        // Try to find user in our database
        const result = await db
            .select({ apiToken: users.apiToken })
            .from(users)
            .where(eq(users.id, clerkUser.id))
            .limit(1);

        if (result.length === 0) {
            // Create user if doesn't exist
            await db.insert(users).values({
                id: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
                image: clerkUser.imageUrl || null,
            });
        } else {
            apiToken = result[0]?.apiToken || null;
        }
    } catch (error) {
        console.error('Error fetching/creating user:', error);
    }

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
            <div className="container mx-auto max-w-4xl p-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-4 inline-block"
                    >
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
                        Settings
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                        Manage your account and API access
                    </p>
                </div>

                {/* Settings Content */}
                <SettingsClient apiToken={apiToken} userId={clerkUser.id} />
            </div>
        </div>
    );
}
