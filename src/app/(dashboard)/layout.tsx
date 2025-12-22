'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-black">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto md:ml-64 transition-all duration-300 pb-16 md:pb-0">
                {/* Mobile Header - Optional, maybe keep for Title but remove Menu button if Sidebar is fully replaced? 
                    Actually, if Sidebar is completely gone on mobile, we don't need the hamburger menu. 
                    Let's hide the hamburger menu and just show the Title on Mobile.
                */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icon-192.png"
                            alt="DayOS Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        {/* <span className="font-bold text-lg text-zinc-900 dark:text-white">DayOS</span> */}
                    </div>
                    <UserButton />
                </div>

                <div className="flex-1">
                    {children}
                </div>
            </div>

            {/* Bottom Navigation for Mobile */}
            <MobileNav />
        </div>
    );
}
