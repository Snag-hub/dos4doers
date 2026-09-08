'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: '/reset-password',
        });

        setLoading(false);

        // Always show the same success state, whether or not the email
        // exists — avoids leaking which addresses have accounts.
        if (!error) {
            setSent(true);
        } else {
            toast.error(error.message || 'Something went wrong');
        }
    }

    if (sent) {
        return (
            <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl">
                <h1 className="mb-2 text-2xl font-bold text-white">Check your email</h1>
                <p className="text-sm text-zinc-400">
                    If an account exists for <span className="text-white">{email}</span>, we sent a
                    password reset link to it.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            <h1 className="mb-1 text-2xl font-bold text-white">Reset your password</h1>
            <p className="mb-6 text-sm text-zinc-400">
                Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#00D4FF] px-4 py-2 font-semibold text-zinc-950 transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? 'Sending…' : 'Send reset link'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
                <Link href="/sign-in" className="text-[#00D4FF] hover:underline">
                    Back to sign in
                </Link>
            </p>
        </div>
    );
}
