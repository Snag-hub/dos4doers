import { currentUser } from "@clerk/nextjs/server";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "@/components/clerk-buttons";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <Image
          src="/icon-512.png"
          alt="DayOS Logo"
          width={120}
          height={120}
          className="rounded-2xl shadow-xl"
        />
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
          DayOS
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md">
          Save articles, videos, and more to read when you have time.
        </p>

        <div className="mt-8 p-8 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 w-full max-w-sm mx-auto shadow-2xl backdrop-blur-xl">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center mb-6">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium tracking-wide !m-0">WELCOME BACK</p>
                  <p className="text-xl font-semibold text-zinc-900 dark:text-white !m-0">{user.firstName || 'User'}</p>
                </div>
              </div>

              <Link
                href="/inbox"
                className="group relative w-full rounded-xl bg-blue-600 p-4 text-center text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <div className="flex items-center justify-center gap-2 font-medium">
                  <span>Launch DayOS</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <Link
                  href="/settings"
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/50 p-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  Configure
                </Link>
                <div className="[&>span]:w-full">
                  <SignOutButton />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sign in to sync your reading list across devices.</p>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
