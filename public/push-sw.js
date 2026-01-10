console.log('[push-sw] Custom Worker Loaded');

self.addEventListener('push', function (event) {
    console.log('[push-sw] Push Event Received');
    let data = { title: 'DOs 4 DOERs', body: 'New alert!', url: '/', itemId: null, type: 'general' };

    try {
        if (event.data) {
            const rawData = event.data.json();
            console.log('[push-sw] Payload:', rawData);
            data = { ...data, ...rawData };
        }
    } catch (e) {
        console.error('[push-sw] Data extraction error:', e);
        // Fallback for non-JSON or malformed data
        const text = event.data ? event.data.text() : 'No data';
        data.body = text;
    }

    const actions = [];
    if ((data.type === 'reminder' || data.type === 'item' || data.type === 'task') && data.itemId) {
        actions.push(
            { action: 'mark-read', title: '✅ Done' },
            { action: 'snooze', title: '💤 Snooze 1h' }
        );
    }

    const options = {
        body: data.body || 'New notification',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [100, 50, 100],
        actions: actions,
        data: {
            dateOfArrival: Date.now(),
            url: data.url || '/',
            itemId: data.itemId,
            type: data.type
        },
        tag: data.itemId || 'general-notification', // Overwrite old notification if same item
        renotify: true
    };

    console.log('[push-sw] Displaying notification:', data.title);
    event.waitUntil(
        self.registration.showNotification(data.title || 'DOs 4 DOERs', options)
            .then(() => console.log('[push-sw] Notification shown successfully'))
            .catch(err => console.error('[push-sw] showNotification failed:', err))
    );
});

self.addEventListener('notificationclick', function (event) {
    const action = event.action;
    const notification = event.notification;
    const data = notification.data;

    console.log('[push-sw] Notification clicked. Action:', action);

    event.notification.close();

    if (action === 'snooze' || action === 'mark-read' || action === 'delete') {
        // Send action to API
        event.waitUntil(
            fetch('/api/notifications/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: action,
                    itemId: data.itemId,
                    type: data.type
                })
            })
                .then(response => {
                    if (response.ok) {
                        console.log('[push-sw] Action processed:', action);
                    } else {
                        console.error('[push-sw] Action failed:', action);
                    }
                })
                .catch(err => console.error('[push-sw] Action request error:', err))
        );
    } else {
        // Default click - open the app
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
                if (clientList.length > 0) {
                    let client = clientList[0];
                    for (let i = 0; i < clientList.length; i++) {
                        if (clientList[i].focused) {
                            client = clientList[i];
                        }
                    }
                    return client.focus();
                }
                return clients.openWindow(data.url);
            })
        );
    }
});
