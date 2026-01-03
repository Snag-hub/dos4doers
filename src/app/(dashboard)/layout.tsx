import { checkBetaAccess, enforceBetaLimit } from '@/lib/beta-access';
import DashboardLayoutClient from './dashboard-layout-client';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Check Beta Access (Redirects if waitlisted)
    await checkBetaAccess();

    // 2. Ensure user is tracked in DB (Self-correcting sync)
    const user = await currentUser();
    if (user) {
        // Just fire and forget, or await if critical. 
        // checkBetaAccess already checks DB state. If missing, we might want to sync.
        // For now, let's assume sync happens elsewhere or we add a lightweight check here?
        // Actually, let's defer to the beta-access logic which we might enhance.

        // Let's call enforce to ensure they are tallied if not present
        const email = user.emailAddresses[0]?.emailAddress;
        if (email) {
            await enforceBetaLimit(user.id, email);
        }
    }

    return (
        <DashboardLayoutClient>
            {children}
        </DashboardLayoutClient>
    );
}
