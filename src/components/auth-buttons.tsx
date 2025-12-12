'use client';

import { signIn, signOut } from 'next-auth/react';

export function LoginButton() {
    return (
        <button
            onClick={() => signIn()}
            className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
        >
            Sign In
        </button>
    );
}

export function LogoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="rounded-full border border-zinc-200 px-6 py-3 text-zinc-900 hover:bg-zinc-100 transition-colors dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
            Sign Out
        </button>
    );
}
