'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import { SearchTrigger } from '@/components/search-trigger';
import { OfflineStoreProvider } from '@/lib/offline-store-context';

export default function DashboardLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <OfflineStoreProvider>
        <div className="flex h-[100dvh] bg-zinc-50 dark:bg-black overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col md:ml-64 h-full relative">

                {/* Mobile Header - Permanently visible at top */}
                <header className="md:hidden flex-none flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-20">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icon-192.png"
                            alt="DOs 4 DOERs"
                            width={28}
                            height={28}
                            className="rounded-lg"
                        />
                        <span className="font-bold text-lg text-zinc-900 dark:text-white">DOs 4 DOERs</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <SearchTrigger variant="compact" />
                        <Link href="/settings" className="relative h-8 w-8 shrink-0" aria-label="Account settings">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'Account'}
                                    fill
                                    className="rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                                    {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
                                </div>
                            )}
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 md:pb-0 scroll-smooth">
                    {children}
                </main>
            </div>

            {/* Bottom Navigation for Mobile */}
            <MobileNav />
        </div>
        </OfflineStoreProvider>
    );
}
