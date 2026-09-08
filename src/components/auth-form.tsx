'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

type Mode = 'sign-in' | 'sign-up';

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const isSignUp = mode === 'sign-up';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    setLoading(false);

    if (error) {
      toast.error(error.message || 'Something went wrong');
      return;
    }

    // Email/password sign-up never returns a session while email
    // verification is required — show a "check your inbox" state instead
    // of redirecting somewhere the middleware would just bounce back from.
    if (isSignUp) {
      setCheckEmail(true);
      return;
    }

    router.push('/inbox');
    router.refresh();
  }

  if (checkEmail) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl">
        <h1 className="mb-2 text-2xl font-bold text-white">Check your email</h1>
        <p className="text-sm text-zinc-400">
          We sent a verification link to <span className="text-white">{email}</span>. Click it to
          finish setting up your account.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
      <h1 className="mb-1 text-2xl font-bold text-white">
        {isSignUp ? 'Create your account' : 'Welcome back'}
      </h1>
      <p className="mb-6 text-sm text-zinc-400">
        {isSignUp ? 'Less planning. More doing.' : 'Sign in to your account'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
            />
          </div>
        )}

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

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Password
            </label>
            {!isSignUp && (
              <Link href="/forgot-password" className="text-xs text-[#00D4FF] hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
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
          {loading ? 'Please wait…' : isSignUp ? 'Sign up' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#00D4FF] hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[#00D4FF] hover:underline">
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
