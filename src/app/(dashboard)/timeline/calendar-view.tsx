'use client';

import { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { TimelineEvent } from '@/lib/timeline-utils';
import { TimelineEventCard } from './timeline-event-card';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import './calendar.css';

type CalendarViewProps = {
    initialEvents: TimelineEvent[];
};

export default function CalendarView({ initialEvents }: CalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewDate, setViewDate] = useState<Date>(new Date());

    // Memoize events by date for efficient lookup
    const eventsByDate = useMemo(() => {
        const map: Record<string, TimelineEvent[]> = {};
        initialEvents.forEach(event => {
            const dateKey = new Date(event.startTime).toDateString();
            if (!map[dateKey]) map[dateKey] = [];
            map[dateKey].push(event);
        });
        return map;
    }, [initialEvents]);

    // Events for the currently selected day
    const selectedDayEvents = useMemo(() => {
        const dateKey = selectedDate.toDateString();
        return (eventsByDate[dateKey] || []).sort((a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
    }, [selectedDate, eventsByDate]);

    // Custom tile renderer
    const renderTileContent = ({ date, view }: { date: Date, view: string }) => {
        if (view !== 'month') return null;

        const dateKey = date.toDateString();
        const dayEvents = eventsByDate[dateKey] || [];

        if (dayEvents.length === 0) return (
            <div className="tile-wrapper">
                <div className="tile-date">{date.getDate()}</div>
            </div>
        );

        return (
            <div className="tile-wrapper">
                <div className="tile-date">{date.getDate()}</div>
                <div className="tile-events">
                    {/* Dots for mobile/small view */}
                    <div className="flex sm:hidden gap-0.5 mt-auto">
                        {dayEvents.slice(0, 3).map((e, i) => (
                            <div
                                key={i}
                                className={`tile-event-dot ${getEventColor(e.type)}`}
                            />
                        ))}
                    </div>
                    {/* Badges for desktop */}
                    {dayEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className={`tile-event-badge ${getEventBadgeClass(event.type)}`}>
                            <span className="truncate">{event.title}</span>
                        </div>
                    ))}
                    {dayEvents.length > 3 && (
                        <div className="text-[9px] text-zinc-400 pl-1.5 hidden sm:block">
                            +{dayEvents.length - 3} more
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'meeting': return 'bg-blue-500';
            case 'task': return 'bg-green-500';
            case 'item': return 'bg-purple-500';
            case 'reminder': return 'bg-amber-500';
            default: return 'bg-zinc-400';
        }
    };

    const getEventBadgeClass = (type: string) => {
        switch (type) {
            case 'meeting': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'task': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'item': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
            case 'reminder': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
            default: return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
            {/* Calendar Section */}
            <div className="flex-1 min-w-0">
                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 sm:p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
                    {/* Custom Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                {initialEvents.length} total events this quarter
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                            </button>
                            <button
                                onClick={() => setViewDate(new Date())}
                                className="px-3 py-1.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>
                    </div>

                    <Calendar
                        activeStartDate={viewDate}
                        onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate || new Date())}
                        value={selectedDate}
                        onChange={(value) => setSelectedDate(value as Date)}
                        tileContent={renderTileContent}
                        formatShortWeekday={(_, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                    />
                </div>
            </div>

            {/* Daily Details Drawer Section */}
            <div className="lg:w-96 flex-shrink-0 flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg backdrop-blur-sm">
                <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-500" />
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'event' : 'events'} scheduled
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map((event) => (
                            <div key={event.id} className="transition-transform active:scale-[0.98]">
                                <TimelineEventCard event={event} />
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 opacity-60">
                            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4 transition-transform hover:scale-110 duration-300">
                                <Clock className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                            </div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Wide open day</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 px-8">No meetings, tasks or reminders for this date.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
