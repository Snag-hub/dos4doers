'use client';

import { SignInButton as ClerkSignInButton, SignOutButton as ClerkSignOutButton, useUser } from '@clerk/nextjs';

export function SignInButton() {
    const { isSignedIn } = useUser();

    if (isSignedIn) {
        return null;
    }

    return (
        <ClerkSignInButton mode="modal">
            <button className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors">
                Sign In
            </button>
        </ClerkSignInButton>
    );
}

export function SignOutButton() {
    return (
        <ClerkSignOutButton>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/50 p-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300">
                Sign Out
            </button>
        </ClerkSignOutButton>
    );
}
