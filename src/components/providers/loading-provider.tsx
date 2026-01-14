'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Loader4 } from '@/components/loader-4';

interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const prevPathnameRef = useRef(pathname);
    const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const minDisplayTimeRef = useRef<NodeJS.Timeout | null>(null);

    const showLoading = () => {
        setIsLoading(true);
    };

    const hideLoading = () => {
        setIsLoading(false);
        // Clear any pending timers
        if (loadingTimerRef.current) {
            clearTimeout(loadingTimerRef.current);
            loadingTimerRef.current = null;
        }
        if (minDisplayTimeRef.current) {
            clearTimeout(minDisplayTimeRef.current);
            minDisplayTimeRef.current = null;
        }
    };

    // Automatic route change detection
    useEffect(() => {
        if (pathname !== prevPathnameRef.current) {
            // Route changed - show loader
            setIsLoading(true);

            // Ensure loader shows for minimum 300ms
            const startTime = Date.now();
            minDisplayTimeRef.current = setTimeout(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 300 - elapsed);

                loadingTimerRef.current = setTimeout(() => {
                    setIsLoading(false);
                }, remaining);
            }, 0);

            prevPathnameRef.current = pathname;
        }
    }, [pathname]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
            if (minDisplayTimeRef.current) clearTimeout(minDisplayTimeRef.current);
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
            {isLoading && <Loader4 fullscreen />}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
