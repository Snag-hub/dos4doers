import { checkBetaAccess } from '@/lib/beta-access';
import DashboardLayoutClient from './dashboard-layout-client';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Redirects to /waitlist if the user's status is 'waitlist'.
    await checkBetaAccess();

    return (
        <DashboardLayoutClient>
            {children}
        </DashboardLayoutClient>
    );
}
