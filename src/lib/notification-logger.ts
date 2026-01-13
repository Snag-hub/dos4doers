// Simple notification logging utility
// Logs to console with structured format for easy monitoring
import { db } from '@/db';
import { notificationLogs } from '@/db/schema';

export type NotificationType = 'email' | 'push';
export type NotificationStatus = 'success' | 'failure';

export interface NotificationLog {
    timestamp: string;
    userId: string;
    type: NotificationType;
    status: NotificationStatus;
    recipient?: string; // email address or device endpoint
    error?: string;
    metadata?: Record<string, any>;
}

export async function logNotification(log: Omit<NotificationLog, 'timestamp'>) {
    const fullLog: NotificationLog = {
        ...log,
        timestamp: new Date().toISOString(),
    };

    // Structured logging for easy parsing
    const logLevel = log.status === 'success' ? 'info' : 'error';
    const message = `[NOTIFICATION] ${log.type.toUpperCase()} ${log.status.toUpperCase()} - User: ${log.userId}${log.recipient ? ` - Recipient: ${log.recipient}` : ''}${log.error ? ` - Error: ${log.error}` : ''}`;

    if (logLevel === 'error') {
        console.error(message, fullLog);
    } else {
        console.log(message, fullLog);
    }

    // Persist to Database
    try {
        await db.insert(notificationLogs).values({
            userId: log.userId,
            type: log.type,
            channel: log.recipient,
            status: log.status,
            error: log.error,
            metadata: log.metadata,
        });
    } catch (err) {
        console.error('Failed to write notification log to DB:', err);
    }

    return fullLog;
}

// Helper to wrap notification sends with logging
export async function withNotificationLogging<T>(
    userId: string,
    type: NotificationType,
    recipient: string | undefined,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
): Promise<{ success: boolean; result?: T; error?: string }> {
    try {
        const result = await fn();
        await logNotification({
            userId,
            type,
            status: 'success',
            recipient,
            metadata,
        });
        return { success: true, result };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await logNotification({
            userId,
            type,
            status: 'failure',
            recipient,
            error: errorMessage,
            metadata,
        });
        return { success: false, error: errorMessage };
    }
}
