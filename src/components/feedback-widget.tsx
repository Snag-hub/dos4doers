'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitFeedback } from '@/app/feedback-actions';
import { usePathname } from 'next/navigation';

interface FeedbackWidgetProps {
    trigger?: React.ReactNode;
}

export function FeedbackWidget({ trigger }: FeedbackWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const pathname = usePathname();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        try {
            await submitFeedback(message, pathname);
            toast.success('Feedback sent! Thank you.');
            setMessage('');
            setIsOpen(false);
        } catch (error) {
            toast.error('Failed to send feedback. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            {trigger ? (
                <div onClick={() => setIsOpen(true)} className="contents cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'bg-zinc-800 text-white dark:bg-zinc-700' : 'bg-blue-600 text-white'}`}
                    aria-label={isOpen ? "Close Feedback" : "Send Feedback"}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </button>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed bottom-40 right-4 md:bottom-24 md:right-8 z-50 w-[calc(100vw-32px)] md:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-200">
                    <form onSubmit={handleSubmit} className="p-4">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                            Send Feedback
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                            Found a bug or have an idea? Let us know directly.
                        </p>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue or idea..."
                            className="w-full h-32 p-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none mb-4 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                            autoFocus
                        />

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSending || !message.trim()}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSending ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send <Send className="w-3 h-3" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
