'use client';

import { Download, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useOfflineIds } from '@/lib/offline-store-context';
import { saveItemOffline, removeItemOffline, type OfflineItemRecord } from '@/lib/offline-store';

type OfflineableItem = Omit<OfflineItemRecord, 'savedOfflineAt'>;

export function OfflineToggleButton({
    item,
    variant = 'icon',
}: {
    item: OfflineableItem;
    variant?: 'icon' | 'label';
}) {
    const { ids, add, remove } = useOfflineIds();
    const isSaved = ids.has(item.id);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSaved) {
            remove(item.id);
            try {
                await removeItemOffline(item.id);
                toast.success('Removed from offline reading');
            } catch {
                add(item.id);
                toast.error('Failed to remove offline copy');
            }
            return;
        }

        add(item.id);
        try {
            await saveItemOffline({ ...item, savedOfflineAt: new Date().toISOString() });
            toast.success('Saved for offline reading');
        } catch {
            remove(item.id);
            toast.error('Failed to save for offline reading');
        }
    };

    if (variant === 'label') {
        return (
            <button
                onClick={handleClick}
                title={isSaved ? 'Remove offline copy' : 'Save for offline reading'}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${isSaved
                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
            >
                {isSaved ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                {isSaved ? 'Saved offline' : 'Save offline'}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            title={isSaved ? 'Remove offline copy' : 'Save for offline reading'}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isSaved
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
        >
            {isSaved ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
        </button>
    );
}
