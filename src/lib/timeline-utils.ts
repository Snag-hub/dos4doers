// Timeline utilities for aggregating and formatting daily events

export type TimelineEventType = 'meeting' | 'task' | 'item' | 'reminder' | 'free-time';

export type TimelineEvent = {
    id: string;
    type: TimelineEventType;
    title: string;
    startTime: Date;
    endTime?: Date;
    duration?: number; // in minutes
    status?: string;
    url?: string;
    favicon?: string;
    metadata?: {
        meetingLink?: string;
        projectId?: string;
        itemType?: string;
        recurrence?: string;
        [key: string]: any;
    };
};

// Helper to get start and end of day
export function getDayBounds(date: Date): { start: Date; end: Date } {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

// Calculate duration between two times in minutes
export function calculateDuration(start: Date, end: Date): number {
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
}

// Sort events chronologically
export function sortEvents(events: TimelineEvent[]): TimelineEvent[] {
    return events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

// Calculate free time blocks (gaps > 30 minutes between events)
export function calculateFreeTimeBlocks(
    events: TimelineEvent[],
    dayStart: Date,
    dayEnd: Date
): TimelineEvent[] {
    const sortedEvents = sortEvents(events.filter(e => e.type !== 'free-time'));
    const freeBlocks: TimelineEvent[] = [];
    const minGapMinutes = 30;

    // Check for free time before first event
    if (sortedEvents.length > 0) {
        const firstEventStart = sortedEvents[0].startTime;
        const gapMinutes = calculateDuration(dayStart, firstEventStart);

        if (gapMinutes >= minGapMinutes) {
            freeBlocks.push({
                id: `free-start`,
                type: 'free-time',
                title: `${Math.floor(gapMinutes / 60)}h ${gapMinutes % 60}m free`,
                startTime: dayStart,
                endTime: firstEventStart,
                duration: gapMinutes,
            });
        }
    }

    // Check for gaps between events
    for (let i = 0; i < sortedEvents.length - 1; i++) {
        const currentEvent = sortedEvents[i];
        const nextEvent = sortedEvents[i + 1];

        const currentEnd = currentEvent.endTime || currentEvent.startTime;
        const gapMinutes = calculateDuration(currentEnd, nextEvent.startTime);

        if (gapMinutes >= minGapMinutes) {
            freeBlocks.push({
                id: `free-${i}`,
                type: 'free-time',
                title: `${Math.floor(gapMinutes / 60)}h ${gapMinutes % 60}m free`,
                startTime: currentEnd,
                endTime: nextEvent.startTime,
                duration: gapMinutes,
            });
        }
    }

    // Check for free time after last event
    if (sortedEvents.length > 0) {
        const lastEvent = sortedEvents[sortedEvents.length - 1];
        const lastEventEnd = lastEvent.endTime || lastEvent.startTime;
        const gapMinutes = calculateDuration(lastEventEnd, dayEnd);

        if (gapMinutes >= minGapMinutes) {
            freeBlocks.push({
                id: `free-end`,
                type: 'free-time',
                title: `${Math.floor(gapMinutes / 60)}h ${gapMinutes % 60}m free`,
                startTime: lastEventEnd,
                endTime: dayEnd,
                duration: gapMinutes,
            });
        }
    }

    return freeBlocks;
}

// Group events by hour for rendering
export function groupEventsByHour(events: TimelineEvent[]): Map<number, TimelineEvent[]> {
    const grouped = new Map<number, TimelineEvent[]>();

    for (const event of events) {
        const hour = event.startTime.getHours();
        if (!grouped.has(hour)) {
            grouped.set(hour, []);
        }
        grouped.get(hour)!.push(event);
    }

    return grouped;
}

// Format time for display (e.g., "2:30 PM")
export function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

// Format duration for display (e.g., "1h 30m")
export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

// Get hour range for timeline (6 AM - 11 PM by default)
export function getTimelineHours(start: number = 6, end: number = 23): number[] {
    const hours: number[] = [];
    for (let i = start; i <= end; i++) {
        hours.push(i);
    }
    return hours;
}

// Calculate position percentage for event in timeline
export function calculateEventPosition(
    eventTime: Date,
    dayStart: Date,
    dayEnd: Date
): number {
    const totalMinutes = calculateDuration(dayStart, dayEnd);
    const eventMinutes = calculateDuration(dayStart, eventTime);
    return (eventMinutes / totalMinutes) * 100;
}
