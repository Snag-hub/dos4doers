/// <reference lib="webworker" />
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { ExpirationPlugin, NetworkFirst, NetworkOnly, Serwist, StaleWhileRevalidate } from 'serwist';

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: false,
    disableDevLogs: true,
    runtimeCaching: [
        {
            // Matches next-pwa's undocumented default "start-url" route: cache
            // the app shell with NetworkFirst, normalizing opaque redirects
            // (e.g. an auth redirect) into a real 200 response so it's cacheable.
            matcher: ({ url }) => url.pathname === '/',
            handler: new NetworkFirst({
                cacheName: 'start-url',
                plugins: [
                    {
                        cacheWillUpdate: async ({ response }) =>
                            response && response.type === 'opaqueredirect'
                                ? new Response(response.body, {
                                    status: 200,
                                    statusText: 'OK',
                                    headers: response.headers,
                                })
                                : response,
                    },
                ],
            }),
        },
        {
            matcher: ({ url }) => url.origin === 'https://vercel.live',
            handler: new NetworkOnly(),
        },
        {
            matcher: ({ url }) => /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i.test(url.pathname),
            handler: new StaleWhileRevalidate({
                cacheName: 'static-font-assets',
                plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 7 * 24 * 60 * 60 })],
            }),
        },
        {
            // Same-origin only: this used to match by extension alone, which also
            // caught cross-origin link thumbnails (blog/YouTube preview images).
            // Those requests come back as opaque no-cors responses that this
            // strategy can't safely revalidate, which was breaking thumbnail
            // rendering on item cards. Third-party images should just hit the
            // network directly instead of going through this cache.
            matcher: ({ url }) => url.origin === self.location.origin && /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i.test(url.pathname),
            handler: new StaleWhileRevalidate({
                cacheName: 'static-image-assets',
                plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 })],
            }),
        },
        {
            matcher: ({ url }) => /\.(?:js)$/i.test(url.pathname),
            handler: new StaleWhileRevalidate({
                cacheName: 'static-js-assets',
                plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 })],
            }),
        },
        {
            matcher: ({ url }) => /\.(?:css|less)$/i.test(url.pathname),
            handler: new StaleWhileRevalidate({
                cacheName: 'static-style-assets',
                plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 })],
            }),
        },
    ],
});

serwist.addEventListeners();

// --- Push notifications ---
// Ported from the old public/push-sw.js (previously merged in via next-pwa's
// `importScripts`). Serwist's model is a single self-contained worker source
// file, so this logic now lives here directly instead of a separate file.

interface PushPayload {
    title: string;
    body: string;
    url: string;
    itemId: string | null;
    type: string;
    icon?: string;
    badge?: string;
}

// TypeScript's bundled webworker lib is missing newer Notification API
// members (`NotificationAction`, `NotificationOptions.vibrate`) that are
// widely supported at runtime — declared locally rather than depending on
// ambient lib coverage.
interface NotificationAction {
    action: string;
    title: string;
    icon?: string;
}

interface ExtendedNotificationOptions extends NotificationOptions {
    vibrate?: number[];
    actions?: NotificationAction[];
    renotify?: boolean;
}

self.addEventListener('push', (event: PushEvent) => {
    console.log('[sw] Push Event Received');
    let data: PushPayload = { title: 'DOs 4 DOERs', body: 'New alert!', url: '/', itemId: null, type: 'general' };

    try {
        if (event.data) {
            const rawData = event.data.json();
            console.log('[sw] Payload:', rawData);
            data = { ...data, ...rawData };
        }
    } catch (e) {
        console.error('[sw] Data extraction error:', e);
        // Fallback for non-JSON or malformed data
        const text = event.data ? event.data.text() : 'No data';
        data.body = text;
    }

    const actions: NotificationAction[] = [];
    if ((data.type === 'reminder' || data.type === 'item' || data.type === 'task') && data.itemId) {
        actions.push(
            { action: 'mark-read', title: '✅ Done' },
            { action: 'snooze', title: '💤 Snooze 1h' }
        );
    }

    const options: ExtendedNotificationOptions = {
        body: data.body || 'New notification',
        // `icon` is displayed in the notification drawer; `badge` is used by
        // Android's status bar. Both point to the installed app's icon.
        icon: data.icon || '/icon-192.png',
        badge: data.badge || '/icon-192.png',
        vibrate: [100, 50, 100],
        actions,
        data: {
            dateOfArrival: Date.now(),
            url: data.url || '/',
            itemId: data.itemId,
            type: data.type,
        },
        tag: data.itemId || 'general-notification', // Overwrite old notification if same item
        renotify: true,
    };

    console.log('[sw] Displaying notification:', data.title);
    event.waitUntil(
        self.registration
            .showNotification(data.title || 'DOs 4 DOERs', options)
            .then(() => console.log('[sw] Notification shown successfully'))
            .catch((err) => console.error('[sw] showNotification failed:', err))
    );
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
    const action = event.action;
    const notification = event.notification;
    const data = notification.data;

    console.log('[sw] Notification clicked. Action:', action);

    event.notification.close();

    if (action === 'snooze' || action === 'mark-read' || action === 'delete') {
        // Send action to API
        event.waitUntil(
            fetch('/api/notifications/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    itemId: data.itemId,
                    type: data.type,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('[sw] Action processed:', action);
                    } else {
                        console.error('[sw] Action failed:', action);
                    }
                })
                .catch((err) => console.error('[sw] Action request error:', err))
        );
    } else {
        // Default click - open the app
        event.waitUntil(
            self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
                if (clientList.length > 0) {
                    let client = clientList[0];
                    for (let i = 0; i < clientList.length; i++) {
                        const c = clientList[i] as WindowClient;
                        if (c.focused) {
                            client = c;
                        }
                    }
                    return (client as WindowClient).focus();
                }
                return self.clients.openWindow(data.url);
            })
        );
    }
});
