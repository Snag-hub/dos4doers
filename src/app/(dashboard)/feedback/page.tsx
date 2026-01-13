'use client';

import { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { submitFeedback } from '@/app/feedback-actions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FeedbackPage() {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        try {
            await submitFeedback(message, pathname); // Pathname here will be /feedback, which is fine
            toast.success('Feedback sent! Thank you.');
            setMessage('');
            router.back();
        } catch (error) {
            toast.error('Failed to send feedback. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 lg:p-12 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
                <Link href="/settings" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 transition-colors mb-8 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Settings
                </Link>
                <header className="space-y-4 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Send Feedback</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Found a bug or have an idea? Let us know directly. We read every message.
                    </p>
                </header>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Your Feedback
                    </label>
                    <textarea
                        id="feedback"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your issue or idea in detail..."
                        className="w-full h-48 p-4 text-base rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        autoFocus
                        required
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSending || !message.trim()}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/10"
                    >
                        {isSending ? (
                            'Sending...'
                        ) : (
                            <>
                                Send Feedback <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
