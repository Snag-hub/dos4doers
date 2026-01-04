console.log('[push-sw] Custom Worker Loaded');

self.addEventListener('push', function (event) {
    console.log('[push-sw] Push Received');
    let data = { title: 'DOs 4 DOERs Notification', body: 'New alert!', url: '/', itemId: null, type: 'general' };

    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        console.error('[push-sw] JSON Parse Error:', e);
    }

    const actions = [];

    // Add actions based on notification type
    if ((data.type === 'reminder' || data.type === 'item') && data.itemId) {
        actions.push(
            { action: 'mark-read', title: '✅ Done' },
            { action: 'snooze', title: '💤 Snooze 1h' },
            { action: 'delete', title: '🗑️ Delete' }
        );
    }

    const options = {
        body: data.body || 'New notification',
        vibrate: [100, 50, 100],
        actions: actions,
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1',
            url: data.url || '/',
            itemId: data.itemId,
            type: data.type
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'DOs 4 DOERs', options)
            .catch(err => console.error('[push-sw] Show Notification Error:', err))
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
