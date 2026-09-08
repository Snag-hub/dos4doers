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

    // Detect route change during render (React's documented pattern for
    // deriving state from a prop change without an extra render/effect pass).
    if (pathname !== prevPathnameRef.current) {
        prevPathnameRef.current = pathname;
        setIsLoading(true);
    }

    // Once a route change has shown the loader, ensure it stays up for a
    // minimum 300ms before hiding it again.
    useEffect(() => {
        if (!isLoading) return;

        const startTime = Date.now();
        minDisplayTimeRef.current = setTimeout(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 300 - elapsed);

            loadingTimerRef.current = setTimeout(() => {
                setIsLoading(false);
            }, remaining);
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
