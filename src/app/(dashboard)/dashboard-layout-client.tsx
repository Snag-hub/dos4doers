'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { SearchTrigger } from '@/components/search-trigger';
import { FeedbackWidget } from '@/components/feedback-widget';
import { CreateTaskDialog } from '@/components/create-task-dialog';
import { Plus } from 'lucide-react';

export default function DashboardLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    return (
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
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="Accounts"
                                    labelIcon={<Menu className="w-4 h-4" />}
                                    onClick={() => window.location.href = '/settings'}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden pb-28 md:pb-0 scroll-smooth">
                    {children}
                </main>
            </div>

            {/* Bottom Navigation for Mobile */}
            <MobileNav />
            <FeedbackWidget />

            {/* Floating Action Button (Mobile Only) */}
            <button
                onClick={() => setIsCreateTaskOpen(true)}
                className="md:hidden fixed bottom-20 right-4 z-50 p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                aria-label="Create Task"
            >
                <Plus className="w-6 h-6" />
            </button>

            {isCreateTaskOpen && (
                <CreateTaskDialog
                    onClose={() => setIsCreateTaskOpen(false)}
                    projects={user?.publicMetadata?.projects as any}
                />
            )}
        </div>
    );
}
