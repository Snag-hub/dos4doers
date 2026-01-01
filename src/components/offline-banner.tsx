'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(true);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setShowReconnected(true);

            // Hide reconnected message after 3 seconds
            setTimeout(() => {
                setShowReconnected(false);
            }, 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowReconnected(false);
        };

        // Add event listeners
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {(!isOnline || showReconnected) && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <div
                        className={`${isOnline
                                ? 'bg-green-600 dark:bg-green-700'
                                : 'bg-amber-600 dark:bg-amber-700'
                            } text-white shadow-lg`}
                    >
                        <div className="max-w-7xl mx-auto px-4 py-3">
                            <div className="flex items-center justify-center gap-3">
                                {isOnline ? (
                                    <>
                                        <Wifi className="w-5 h-5" />
                                        <p className="text-sm font-medium">
                                            You're back online!
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <WifiOff className="w-5 h-5" />
                                        <p className="text-sm font-medium">
                                            You're offline. Some features may not be available.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
