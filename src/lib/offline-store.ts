// IndexedDB-backed store for articles saved for offline reading.
//
// Schema/version note: `public/offline-reader-shell.html` (the service worker's
// navigation fallback for /reader/*, see src/app/sw.ts) opens this same
// database directly with vanilla `indexedDB.open()` — it can't import this
// module since it's a hand-authored static file outside the Next.js build.
// Any change to DB_NAME/DB_VERSION/STORE_NAME here must be mirrored there.

const DB_NAME = 'dos4doers-offline';
const DB_VERSION = 1;
const STORE_NAME = 'items';

export interface OfflineItemRecord {
    id: string;
    title: string | null;
    content: string;
    textContent: string | null;
    url: string;
    siteName: string | null;
    favicon: string | null;
    author: string | null;
    image: string | null;
    createdAt: string;
    savedOfflineAt: string;
}

function isIndexedDbAvailable(): boolean {
    return typeof indexedDB !== 'undefined';
}

function openOfflineDb(): Promise<IDBDatabase> {
    if (!isIndexedDbAvailable()) {
        return Promise.reject(new Error('IndexedDB is not available in this environment'));
    }

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error('Failed to open offline store'));
    });
}

async function withStore<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const db = await openOfflineDb();
    return new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);
        const request = fn(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error('Offline store request failed'));
        tx.oncomplete = () => db.close();
        tx.onerror = () => db.close();
    });
}

export async function saveItemOffline(record: OfflineItemRecord): Promise<void> {
    await withStore('readwrite', (store) => store.put(record));
}

export async function removeItemOffline(id: string): Promise<void> {
    if (!isIndexedDbAvailable()) return;
    await withStore('readwrite', (store) => store.delete(id));
}

export async function getOfflineItem(id: string): Promise<OfflineItemRecord | undefined> {
    if (!isIndexedDbAvailable()) return undefined;
    const result = await withStore<OfflineItemRecord | undefined>('readonly', (store) => store.get(id));
    return result ?? undefined;
}

export async function getAllOfflineIds(): Promise<string[]> {
    if (!isIndexedDbAvailable()) return [];
    const keys = await withStore<IDBValidKey[]>('readonly', (store) => store.getAllKeys());
    return keys.map((key) => String(key));
}

export async function clearAllOffline(): Promise<void> {
    if (!isIndexedDbAvailable()) return;
    await withStore('readwrite', (store) => store.clear());
}
