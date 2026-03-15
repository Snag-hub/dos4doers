import { checkBetaAccess, enforceBetaLimit } from '@/lib/beta-access';
import DashboardLayoutClient from './dashboard-layout-client';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Ensure user is tracked in DB before access check
    const user = await currentUser();
    if (user) {
        const email = user.emailAddresses[0]?.emailAddress;
        if (email) {
            await enforceBetaLimit(user.id, email);
        }
    }

    // 2. Check Beta Access (Redirects if waitlisted)
    await checkBetaAccess();

    return (
        <DashboardLayoutClient>
            {children}
        </DashboardLayoutClient>
    );
}
