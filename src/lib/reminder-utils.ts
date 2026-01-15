/**
 * Utility functions for reminder scheduling and recurrence handling
 */

/**
 * Calculate the next occurrence for a recurring reminder
 * @param lastScheduledAt - The previous scheduled time
 * @param recurrence - The recurrence pattern (daily, weekly, monthly)
 * @param now - Current time (defaults to now)
 * @returns The next scheduled date/time
 */
export function calculateNextOccurrence(
    lastScheduledAt: Date,
    recurrence: 'daily' | 'weekly' | 'monthly',
    now: Date = new Date()
): Date {
    let nextDate = new Date(lastScheduledAt);

    // Add the interval based on recurrence pattern
    switch (recurrence) {
        case 'daily':
            nextDate.setDate(nextDate.getDate() + 1);
            break;
        case 'weekly':
            nextDate.setDate(nextDate.getDate() + 7);
            break;
        case 'monthly':
            nextDate.setMonth(nextDate.getMonth() + 1);
            break;
    }

    // If next occurrence is still in the past (e.g., server downtime),
    // schedule based on NOW to avoid spam and catch up properly
    while (nextDate <= now) {
        switch (recurrence) {
            case 'daily':
                nextDate.setDate(nextDate.getDate() + 1);
                break;
            case 'weekly':
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'monthly':
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
        }
    }

    return nextDate;
}
