'use client';

import { TimelineEvent, formatDuration } from '@/lib/timeline-utils';

type TimeBlockIndicatorProps = {
    events: TimelineEvent[];
    dayStart: Date;
    dayEnd: Date;
};

export function TimeBlockIndicator({ events, dayStart, dayEnd }: TimeBlockIndicatorProps) {
    const totalMinutes = (dayEnd.getTime() - dayStart.getTime()) / (1000 * 60);

    // Calculate position and height for each event
    const getEventStyle = (event: TimelineEvent) => {
        const startMinutes = (event.startTime.getTime() - dayStart.getTime()) / (1000 * 60);
        const top = (startMinutes / totalMinutes) * 100;

        const duration = event.duration || 30;
        const height = (duration / totalMinutes) * 100;

        return {
            top: `${top}%`,
            height: `${height}%`,
        };
    };

    // Get color for event type
    const getEventColor = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'meeting':
                return 'bg-blue-500';
            case 'task':
                return 'bg-green-500';
            case 'item':
                return 'bg-purple-500';
            case 'reminder':
                return 'bg-orange-500';
            case 'free-time':
                return 'bg-zinc-300 dark:bg-zinc-700';
            default:
                return 'bg-zinc-400';
        }
    };

    // Calculate total busy time
    const busyMinutes = events
        .filter(e => e.type !== 'free-time')
        .reduce((sum, e) => sum + (e.duration || 0), 0);

    const freeMinutes = events
        .filter(e => e.type === 'free-time')
        .reduce((sum, e) => sum + (e.duration || 0), 0);

    return (
        <div className="hidden lg:flex flex-col gap-4 w-48 flex-shrink-0">
            {/* Time Block Visualization */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                    Time Blocks
                </h3>

                {/* Visual timeline */}
                <div className="relative h-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                    {events.map((event, index) => (
                        <div
                            key={`${event.id}-${index}`}
                            className={`absolute left-0 right-0 ${getEventColor(event.type)} opacity-80 hover:opacity-100 transition-opacity`}
                            style={getEventStyle(event)}
                            title={`${event.title} - ${formatDuration(event.duration || 0)}`}
                        />
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-500" />
                        <span className="text-zinc-600 dark:text-zinc-400">Meetings</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span className="text-zinc-600 dark:text-zinc-400">Tasks</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-purple-500" />
                        <span className="text-zinc-600 dark:text-zinc-400">Reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-zinc-300 dark:bg-zinc-700" />
                        <span className="text-zinc-600 dark:text-zinc-400">Free time</span>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                    Summary
                </h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">Busy</span>
                        <span className="font-medium text-zinc-900 dark:text-white">
                            {formatDuration(busyMinutes)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">Free</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                            {formatDuration(freeMinutes)}
                        </span>
                    </div>
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between">
                            <span className="text-zinc-600 dark:text-zinc-400">Events</span>
                            <span className="font-medium text-zinc-900 dark:text-white">
                                {events.filter(e => e.type !== 'free-time').length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
