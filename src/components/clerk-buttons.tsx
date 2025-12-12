'use client';

import { SignInButton as ClerkSignInButton, SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';

export function SignInButton() {
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
            <button className="rounded-full border border-zinc-200 px-6 py-3 text-zinc-900 hover:bg-zinc-100 transition-colors dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800">
                Sign Out
            </button>
        </ClerkSignOutButton>
    );
}
