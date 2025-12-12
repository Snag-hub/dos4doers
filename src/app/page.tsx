import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SignInButton, SignOutButton } from "@/components/clerk-buttons";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
          Read Later
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md">
          Save articles, videos, and more to read when you have time.
        </p>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                href="/inbox"
                className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              >
                Go to Inbox
              </Link>
              <Link
                href="/settings"
                className="rounded-full bg-zinc-200 px-6 py-3 text-black hover:bg-zinc-300 transition-colors dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              >
                Settings
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </main>
    </div>
  );
}
