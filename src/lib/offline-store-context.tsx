'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getAllOfflineIds } from '@/lib/offline-store';

interface OfflineIdsContextValue {
    ids: Set<string>;
    add: (id: string) => void;
    remove: (id: string) => void;
}

const OfflineIdsContext = createContext<OfflineIdsContextValue | null>(null);

export function OfflineStoreProvider({ children }: { children: ReactNode }) {
    const [ids, setIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        let cancelled = false;
        getAllOfflineIds()
            .then((savedIds) => {
                if (!cancelled) setIds(new Set(savedIds));
            })
            .catch(() => {
                // IndexedDB unavailable (e.g. private browsing) — offline toggle stays unavailable.
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const value = useMemo<OfflineIdsContextValue>(() => ({
        ids,
        add: (id: string) => setIds((prev) => new Set(prev).add(id)),
        remove: (id: string) =>
            setIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            }),
    }), [ids]);

    return (
        <OfflineIdsContext.Provider value={value}>
            {children}
        </OfflineIdsContext.Provider>
    );
}

export function useOfflineIds(): OfflineIdsContextValue {
    const ctx = useContext(OfflineIdsContext);
    if (!ctx) {
        throw new Error('useOfflineIds must be used within an OfflineStoreProvider');
    }
    return ctx;
}
