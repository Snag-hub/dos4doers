import Link from "next/link";
import {
    ArrowLeft, BookOpen, Bell, Globe, Zap, CheckCircle, Shield,
    ArrowRight, Search, Keyboard, MousePointer2, ListFilter,
    Sparkles, Trash2, Star, Clock, Laptop, Smartphone
} from "lucide-react";

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
            {/* Header / Sticky Nav */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter">
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        DayOS
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-500">
                        <a href="#quick-start" className="hover:text-blue-600 transition-colors">Quick Start</a>
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#power-user" className="hover:text-blue-600 transition-colors">Power User</a>
                        <a href="#troubleshooting" className="hover:text-blue-600 transition-colors">FAQ</a>
                    </nav>
                    <Link href="/inbox" className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black text-xs font-bold hover:scale-105 transition-all">
                        Launch App
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-6 py-20 pb-40">
                {/* Hero Section */}
                <div className="mb-32 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                        The Master Manual
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                        Master your <br /><span className="text-blue-600">Intelligence.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-medium">
                        Welcome to DayOS. This guide will transform how you capture, organize, and recall everything you find on the web.
                    </p>
                </div>

                <div className="space-y-40">
                    {/* section: Chronology */}
                    <section id="timeline" className="scroll-mt-32">
                        <div className="flex flex-col md:flex-row gap-16 items-center">
                            <div className="flex-1 order-2 md:order-1">
                                <div className="p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <Clock className="w-32 h-32" />
                                    </div>
                                    <h3 className="text-3xl font-black mb-6 tracking-tight">Mastering the Timeline</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
                                        The Timeline is your single source of truth. It stitches together every action into a seamless historical stream.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold text-[10px]">1</div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400"><span className="font-bold text-zinc-900 dark:text-white">Chronological Flow:</span> Jump back to any date to see what you were working on.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold text-[10px]">2</div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400"><span className="font-bold text-zinc-900 dark:text-white">Unified Context:</span> Articles, tasks, and meetings are displayed together as they happened.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1 order-1 md:order-2">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
                                    Historical Recall
                                </span>
                                <h2 className="text-5xl font-black mb-6 tracking-tight">Your digital history, <br />re-visualized.</h2>
                                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    Ever wondered when exactly you saved that one article or when you finished that major project? The Timeline makes recall effortless.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* section: Quick Start */}
                    <section id="quick-start" className="scroll-mt-32">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="flex-1">
                                <h2 className="text-4xl font-black mb-6 tracking-tight">Your First 5 Minutes</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed text-lg">
                                    Setting up DayOS is instant. Follow these four steps to start building your knowledge base.
                                </p>
                                <div className="space-y-8">
                                    <Step number="01" title="Sign In & Connect">
                                        Create an account using Clerk. Your data is isolated and encrypted from day one.
                                    </Step>
                                    <Step number="02" title="Desktop: Browser Extension">
                                        The fastest way to save. Click the DayOS icon in your browser to instantly capture the current page.
                                        <Link href="/extensions" className="text-blue-600 hover:underline inline-flex items-center gap-1 ml-1">
                                            Get Extension <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </Step>
                                    <Step number="03" title="Mobile: Android Sharing">
                                        On your phone? Use the system <span className="text-blue-600 font-bold">Share</span> menu in any app (like Chrome or YouTube) and select <span className="text-blue-600 font-bold">DayOS</span> to save it to your inbox.
                                    </Step>
                                    <Step number="04" title="The Magic: Auto-Extraction">
                                        Once saved, DayOS works in the background. It automatically extracts the clean article text, metadata, and thumbnails so it's ready for you in the <span className="text-blue-600 font-bold">Inbox</span>.
                                    </Step>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative w-full aspect-square rounded-[60px] bg-gradient-to-br from-blue-100 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-zinc-200 dark:border-zinc-800 p-8 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 dark:opacity-40"
                                        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                    <Sparkles className="w-40 h-40 text-blue-500/20 absolute -top-10 -right-10 rotate-12" />
                                    <div className="relative z-10 w-full max-w-xs space-y-4">
                                        {/* Mock Item Card */}
                                        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-bottom-5 duration-700">
                                            <div className="w-full h-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3" />
                                            <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
                                            <div className="h-3 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded" />
                                        </div>
                                        <div className="flex justify-end pr-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white scale-110">
                                                <MousePointer2 className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* section: Feature Deep Dives */}
                    <section id="features" className="scroll-mt-32">
                        <h2 className="text-5xl font-black mb-20 tracking-tight text-center">Core Mechanics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<BookOpen className="w-8 h-8" />}
                                title="Kindle-Style Reader"
                                color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                            >
                                Articles are automatically stripped of ads, popups, and sidebars. Enjoy a clean, high-contrast reading experience designed for focus.
                            </FeatureCard>
                            <FeatureCard
                                icon={<Search className="w-8 h-8" />}
                                title="Omnisearch"
                                color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                                Find any URL, note, or task across your entire OS in milliseconds. It searches metadata and even your personal notes instantly.
                            </FeatureCard>
                            <FeatureCard
                                icon={<Clock className="w-8 h-8" />}
                                title="Intelligent Snooze"
                                color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                                Not ready to read? Snooze items for 10m, 1hr, or until tomorrow. DayOS manages the queue so you don't have to.
                            </FeatureCard>
                        </div>
                    </section>

                    {/* section: The Trinity */}
                    <section id="trinity" className="scroll-mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-black mb-6 tracking-tight">The Trinity</h2>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                                DayOS is your Personal Operating System. It's built on three core pillars that keep your life in sync.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-6">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center">
                                    <ListFilter className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Actionable Tasks</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Don't just save links, act on them. Create tasks, group them into projects, and track your progress without leaving your research.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Digital Notes</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Capture thoughts instantly. Notes in DayOS are context-aware—attach them to articles, tasks, or meetings for effortless recall.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Smart Meetings</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Your schedule, centralized. Manage interviews, calls, and syncs. Attach notes directly to meetings to prepare and follow up.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section id="timeline" className="scroll-mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-black mb-6 tracking-tight">Mastering the Timeline</h2>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                                The central heartbeat of your digital life. Recall every activity in a unified chronological stream.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="p-8 rounded-[40px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                                    <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                        <Clock className="w-6 h-6 text-emerald-600" />
                                        Single Source of Truth
                                    </h4>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                        The Timeline unifies articles, tasks, and meetings into one seamless stream. Never ask &quot;When did I do that?&quot; again. Just scroll and recall.
                                    </p>
                                </div>
                                <div className="p-8 rounded-[40px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                    <h4 className="text-xl font-black mb-4">Historical Recall</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                        Jump to any specific date using the calendar picker. Perfect for reviewing meeting notes from last month or finding that one article you read on a random Tuesday.
                                    </p>
                                </div>
                            </div>
                            <div className="relative group p-10 rounded-[60px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                                <div className="text-center space-y-4">
                                    <div className="h-12 w-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                                    <div className="h-12 w-1 w-[90%] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl mx-auto shadow-sm" />
                                    <div className="h-12 w-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="power-user" className="scroll-mt-32 p-12 md:p-20 rounded-[80px] bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Keyboard className="w-64 h-64" />
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-zinc-900 mb-8 tracking-tight">Become a Power User.</h2>
                            <p className="text-zinc-400 dark:text-zinc-500 mb-12 text-lg leading-relaxed">
                                DayOS is built for speed. Once you master the keyboard, you'll never go back to clicking around.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <Shortcut kbd="Cmd + K" desc="Open Omnisearch from anywhere in the app." />
                                <Shortcut kbd="Enter" desc="Open the reader mode for the selected item." />
                                <Shortcut kbd="Esc" desc="Close any open modal or clear search." />
                                <Shortcut kbd="Cmd + V" desc="Paste a URL while on the Inbox to quick-save." />
                            </div>

                            <div className="mt-20 pt-12 border-t border-zinc-800 dark:border-zinc-200">
                                <h3 className="text-white dark:text-zinc-900 font-bold mb-4 flex items-center gap-2">
                                    <ListFilter className="w-5 h-5 text-blue-500" />
                                    Smart Tagging
                                </h3>
                                <p className="text-zinc-400 dark:text-zinc-500 leading-relaxed">
                                    Organize items into workspaces using <span className="text-white dark:text-zinc-900 font-bold italic">Tags</span>. You can filter your entire view by clicking a tag badge, allowing you to separate "Work" research from "Personal" reading instantly.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* section: FAQ */}
                    <section id="troubleshooting" className="scroll-mt-32">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl font-black mb-12 tracking-tight">FAQ & Troubleshooting</h2>
                            <div className="space-y-6">
                                <FAQ
                                    q="The extension isn't saving my token."
                                    a="Make sure you've copied the correct API Token from your DayOS Settings page. Paste it exactly, and ensure no extra spaces were added at the start or end."
                                />
                                <FAQ
                                    q="Does Reader Mode work on every site?"
                                    a="Most major news sites, blogs, and documentation pages are supported. If a site is heavily protected or uses a non-standard layout, we'll still save the URL and metadata for you."
                                />
                                <FAQ
                                    q="Can I use DayOS on mobile?"
                                    a="Yes! DayOS is a PWA (Progressive Web App). Simply visit the site on Safari (iOS) or Chrome (Android) and choose 'Add to Home Screen' for a native-like experience."
                                />
                                <FAQ
                                    q="How do I permanently delete something?"
                                    a="Move it to the 'Trash' first using the trash icon. From the Trash tab, you can 'Empty Trash' to permanently wipe all items."
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Final CTA */}
                <div className="mt-40 p-16 rounded-[60px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-2xl shadow-blue-500/30">
                    <p className="text-blue-100 font-black uppercase tracking-widest text-sm mb-6">Mastery awaits</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tight">Your digital brain <br />is ready for deployment.</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/inbox"
                            className="px-10 py-5 rounded-3xl bg-white text-blue-600 text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
                        >
                            Open DayOS
                        </Link>
                        <Link
                            href="/extensions"
                            className="px-10 py-5 rounded-3xl bg-black/20 text-white border border-white/20 text-lg font-black transition-all hover:bg-black/30 active:scale-95"
                        >
                            Get Extension
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sub-footer */}
            <footer className="bg-zinc-100 dark:bg-zinc-900 py-20">
                <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-black text-lg mb-6 tracking-tight">Hardware & Compatibility</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <Laptop className="w-5 h-5" />
                                <span className="text-sm font-medium">Desktop: Chrome, Edge, Firefox, Safari</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                                <Smartphone className="w-5 h-5" />
                                <span className="text-sm font-medium">Mobile: iOS & Android (PWA)</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6 tracking-tight">Security & Governance</h4>
                        <div className="space-y-2">
                            <Link href="/privacy" className="block text-sm text-zinc-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="block text-sm text-zinc-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6 tracking-tight">Community</h4>
                        <div className="space-y-2">
                            <a href="mailto:imsnag.1@gmail.com" className="block text-sm text-zinc-500 hover:text-blue-600 transition-colors">Support Email</a>
                            <Link href="/extensions" className="block text-sm text-zinc-500 hover:text-blue-600 transition-colors">Developer Program</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-6 group">
            <div className="flex-shrink-0 text-xl font-black text-zinc-200 dark:text-zinc-800 transition-colors group-hover:text-blue-500">
                {number}
            </div>
            <div>
                <h4 className="font-black text-zinc-900 dark:text-white mb-1">{title}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {children}
                </p>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, children, color }: { icon: React.ReactNode; title: string; children: React.ReactNode; color: string }) {
    return (
        <div className="p-10 rounded-[48px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
            <div className={`mb-6 h-16 w-16 items-center justify-center rounded-3xl flex ${color} shadow-sm`}>
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                {children}
            </p>
        </div>
    );
}

function Shortcut({ kbd, desc }: { kbd: string; desc: string }) {
    return (
        <div>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/10 font-mono text-xs text-zinc-300 dark:text-zinc-600 mb-3 shadow-inner">
                {kbd}
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">
                {desc}
            </p>
        </div>
    );
}

function FAQ({ q, a }: { q: string; a: string }) {
    return (
        <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {q}
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed pl-5 font-medium">
                {a}
            </p>
        </div>
    );
}
