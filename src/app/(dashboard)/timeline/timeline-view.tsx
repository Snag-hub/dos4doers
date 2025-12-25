'use client';

import { useState, useEffect, useRef } from 'react';
import { TimelineEvent, sortEvents, calculateFreeTimeBlocks, getDayBounds, formatTime, getTimelineHours } from '@/lib/timeline-utils';
import { TimelineEventCard } from './timeline-event-card';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

type TimelineViewProps = {
    initialEvents: TimelineEvent[];
    selectedDate: Date;
};

export default function TimelineView({ initialEvents, selectedDate }: TimelineViewProps) {
    const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
    const timelineRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Scroll to current time on mount
    useEffect(() => {
        if (timelineRef.current) {
            const now = new Date();
            const hour = now.getHours();
            const hourElement = document.getElementById(`hour-${hour}`);
            if (hourElement) {
                hourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, []);

    // Calculate all events including free time
    const { start: dayStart, end: dayEnd } = getDayBounds(currentDate);
    const sortedEvents = sortEvents(events);
    const freeTimeBlocks = calculateFreeTimeBlocks(sortedEvents, dayStart, dayEnd);
    const allEvents = sortEvents([...sortedEvents, ...freeTimeBlocks]);

    // Timeline hours (6 AM - 11 PM)
    const hours = getTimelineHours(6, 23);

    // Calculate current time position
    const getCurrentTimePosition = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const totalMinutes = hour * 60 + minute;
        const startMinutes = 6 * 60; // 6 AM
        const endMinutes = 23 * 60; // 11 PM
        const timelineMinutes = endMinutes - startMinutes;
        const position = ((totalMinutes - startMinutes) / timelineMinutes) * 100;
        return Math.max(0, Math.min(100, position));
    };

    // Check if selected date is today
    const isToday = currentDate.toDateString() === new Date().toDateString();

    // Navigate to previous/next day
    const navigateDay = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
        // In a real app, you'd fetch new events here
    };

    // Go to today
    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Format date for display
    const formatDate = (date: Date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };

    // Count events by type
    const eventCounts = {
        meetings: events.filter(e => e.type === 'meeting').length,
        tasks: events.filter(e => e.type === 'task').length,
        items: events.filter(e => e.type === 'item').length,
        reminders: events.filter(e => e.type === 'reminder').length,
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                            Timeline
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                            Your day at a glance
                        </p>
                    </div>

                    {/* Date Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigateDay('prev')}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={goToToday}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isToday
                                ? 'bg-blue-600 text-white'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                }`}
                        >
                            {formatDate(currentDate)}
                        </button>
                        <button
                            onClick={() => navigateDay('next')}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="flex flex-wrap gap-3">
                    {eventCounts.meetings > 0 && (
                        <div className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                            {eventCounts.meetings} meeting{eventCounts.meetings !== 1 ? 's' : ''}
                        </div>
                    )}
                    {eventCounts.tasks > 0 && (
                        <div className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                            {eventCounts.tasks} task{eventCounts.tasks !== 1 ? 's' : ''}
                        </div>
                    )}
                    {eventCounts.items > 0 && (
                        <div className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                            {eventCounts.items} item{eventCounts.items !== 1 ? 's' : ''}
                        </div>
                    )}
                    {freeTimeBlocks.length > 0 && (
                        <div className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                            {freeTimeBlocks.length} free block{freeTimeBlocks.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="relative">
                    {/* Hour markers and events */}
                    {hours.map((hour) => {
                        const hourEvents = allEvents.filter(e => e.startTime.getHours() === hour);

                        return (
                            <div
                                key={hour}
                                id={`hour-${hour}`}
                                className="relative flex border-b border-zinc-200 dark:border-zinc-800"
                                style={{ minHeight: '80px' }}
                            >
                                {/* Hour label */}
                                <div className="w-20 flex-shrink-0 pr-4 pt-2 text-right">
                                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        {formatTime(new Date(new Date().setHours(hour, 0, 0, 0)))}
                                    </span>
                                </div>

                                {/* Events column */}
                                <div className="flex-1 pl-4 py-2 space-y-2">
                                    {hourEvents.map((event) => (
                                        <TimelineEventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Current time indicator */}
                    {isToday && (
                        <div
                            className="absolute left-20 right-0 h-0.5 bg-red-500 z-10 pointer-events-none"
                            style={{ top: `${getCurrentTimePosition()}%` }}
                        >
                            <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
                        </div>
                    )}
                </div>
            </div>

            {/* Empty state */}
            {events.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Calendar className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                            No events scheduled
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Your day is wide open!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
