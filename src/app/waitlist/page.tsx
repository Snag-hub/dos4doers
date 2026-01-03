import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function WaitlistPage() {
    const user = await currentUser();

    if (user) {
        // Double check status. If active, redirect to inbox.
        const dbUser = await db.query.users.findFirst({
            where: eq(users.id, user.id),
        });

        if (dbUser?.status === 'active') {
            redirect('/inbox');
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center">
            <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
                    <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl">
                        <span className="text-4xl">⏳</span>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl">
                    You're on the list!
                </h1>

                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    DOs 4 DOERs is currently in a <strong>limited beta</strong> for the first 50 users.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-6 py-4 rounded-xl text-sm font-medium">
                    We've added you to the waitlist. You'll receive an email as soon as a spot opens up.
                </div>

                <div className="pt-8 text-sm text-zinc-500">
                    <p>Signed in as {user?.emailAddresses[0]?.emailAddress}</p>
                    {/* Optional: Sign out button could go here */}
                </div>
            </div>
        </div>
    );
}
