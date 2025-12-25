'use client';

import { TimelineEvent, formatTime, formatDuration } from '@/lib/timeline-utils';
import { Clock, Calendar, CheckSquare, BookOpen, Bell, ExternalLink } from 'lucide-react';

type TimelineEventCardProps = {
    event: TimelineEvent;
};

export function TimelineEventCard({ event }: TimelineEventCardProps) {
    // Get icon based on event type
    const getIcon = () => {
        switch (event.type) {
            case 'meeting':
                return <Calendar className="w-4 h-4" />;
            case 'task':
                return <CheckSquare className="w-4 h-4" />;
            case 'item':
                return <BookOpen className="w-4 h-4" />;
            case 'reminder':
                return <Bell className="w-4 h-4" />;
            case 'free-time':
                return <Clock className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    // Get color classes based on event type
    const getColorClasses = () => {
        switch (event.type) {
            case 'meeting':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    border: 'border-blue-200 dark:border-blue-800',
                    text: 'text-blue-700 dark:text-blue-300',
                    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
                };
            case 'task':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-green-200 dark:border-green-800',
                    text: 'text-green-700 dark:text-green-300',
                    iconBg: 'bg-green-100 dark:bg-green-900/40',
                };
            case 'item':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    border: 'border-purple-200 dark:border-purple-800',
                    text: 'text-purple-700 dark:text-purple-300',
                    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
                };
            case 'reminder':
                return {
                    bg: 'bg-orange-50 dark:bg-orange-900/20',
                    border: 'border-orange-200 dark:border-orange-800',
                    text: 'text-orange-700 dark:text-orange-300',
                    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
                };
            case 'free-time':
                return {
                    bg: 'bg-zinc-50 dark:bg-zinc-900/20',
                    border: 'border-zinc-200 dark:border-zinc-800 border-dashed',
                    text: 'text-zinc-500 dark:text-zinc-400',
                    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
                };
            default:
                return {
                    bg: 'bg-zinc-50 dark:bg-zinc-900/20',
                    border: 'border-zinc-200 dark:border-zinc-800',
                    text: 'text-zinc-700 dark:text-zinc-300',
                    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
                };
        }
    };

    const colors = getColorClasses();
    const icon = getIcon();

    // Format time range
    const timeRange = event.endTime
        ? `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`
        : formatTime(event.startTime);

    // Handle click for items (open URL)
    const handleClick = () => {
        if (event.type === 'item' && event.url) {
            window.open(event.url, '_blank');
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`
                relative p-3 rounded-lg border transition-all
                ${colors.bg} ${colors.border}
                ${event.type === 'item' && event.url ? 'cursor-pointer hover:shadow-md' : ''}
                ${event.type === 'free-time' ? 'opacity-60' : ''}
            `}
        >
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-1.5 rounded ${colors.iconBg} ${colors.text} flex-shrink-0`}>
                    {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h4 className={`font-medium text-sm ${colors.text} truncate`}>
                                {event.title}
                            </h4>

                            {/* Time and duration */}
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {timeRange}
                                </span>
                                {event.duration && (
                                    <>
                                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {formatDuration(event.duration)}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Metadata */}
                            {event.metadata?.siteName && (
                                <div className="flex items-center gap-1 mt-1">
                                    {event.favicon && (
                                        <img src={event.favicon} alt="" className="w-3 h-3 rounded" />
                                    )}
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {event.metadata.siteName}
                                    </span>
                                </div>
                            )}

                            {event.metadata?.meetingLink && (
                                <a
                                    href={event.metadata.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Join meeting
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
