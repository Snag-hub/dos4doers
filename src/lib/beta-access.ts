import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export async function checkBetaAccess() {
    const session = await getSession();
    if (!session) return;

    if (session.user.status === 'waitlist') {
        redirect('/waitlist');
    }
}
