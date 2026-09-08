import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import SettingsClient from './client';
import { getUserStats } from '@/app/actions';

export default async function SettingsPage() {
    const session = await getSession();

    if (!session) {
        redirect('/');
    }

    let stats: Awaited<ReturnType<typeof getUserStats>> = {
        totalSaved: 0,
        totalRead: 0,
        readPercentage: 0,
        mostViewed: []
    };

    try {
        stats = await getUserStats();
    } catch (error) {
        console.error('Error fetching user stats:', error);
    }

    return (
        <main className="p-4 md:p-8">
            {/* Settings Content */}
            <div className="max-w-4xl mx-auto w-full">
                <SettingsClient
                    apiToken={session.user.apiToken ?? null}
                    userId={session.user.id}
                    initialPreferences={{
                        emailNotifications: session.user.emailNotifications ?? true,
                        pushNotifications: session.user.pushNotifications ?? true,
                    }}
                    initialStats={stats}
                />
            </div>
        </main>
    );
}
