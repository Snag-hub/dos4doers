import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/reset-password-form';

export default function ResetPasswordPage() {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-8">
            <Suspense fallback={null}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}
