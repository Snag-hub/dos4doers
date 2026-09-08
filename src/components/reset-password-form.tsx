'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!token) return;
        setLoading(true);

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || 'Something went wrong');
            return;
        }

        toast.success('Password updated — you can now sign in');
        router.push('/sign-in');
    }

    if (error || !token) {
        return (
            <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl">
                <h1 className="mb-2 text-2xl font-bold text-white">Link expired or invalid</h1>
                <p className="mb-6 text-sm text-zinc-400">
                    This password reset link is no longer valid. Request a new one below.
                </p>
                <Link
                    href="/forgot-password"
                    className="inline-block rounded-lg bg-[#00D4FF] px-4 py-2 font-semibold text-zinc-950 hover:opacity-90"
                >
                    Request new link
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            <h1 className="mb-1 text-2xl font-bold text-white">Choose a new password</h1>
            <p className="mb-6 text-sm text-zinc-400">Must be at least 10 characters.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-300">
                        New password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={10}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#00D4FF] px-4 py-2 font-semibold text-zinc-950 transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? 'Updating…' : 'Update password'}
                </button>
            </form>
        </div>
    );
}
