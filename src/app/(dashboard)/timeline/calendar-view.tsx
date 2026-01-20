'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TimelineEvent } from '@/lib/timeline-utils';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

type CalendarViewProps = {
    initialEvents: TimelineEvent[];
};

export default function CalendarView({ initialEvents }: CalendarViewProps) {
    const [events] = useState(initialEvents.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.startTime),
        end: event.endTime ? new Date(event.endTime) : new Date(new Date(event.startTime).getTime() + (event.duration || 30) * 60000),
        resource: event,
    })));

    const eventStyleGetter = (event: any) => {
        const type = event.resource.type;
        let backgroundColor = '#3b82f6'; // blue-500 default

        switch (type) {
            case 'meeting':
                backgroundColor = '#3b82f6'; // blue
                break;
            case 'task':
                backgroundColor = '#10b981'; // green
                break;
            case 'item':
                backgroundColor = '#8b5cf6'; // purple
                break;
            case 'reminder':
                backgroundColor = '#f59e0b'; // amber
                break;
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '6px',
                opacity: 0.8,
                color: 'white',
                border: 'none',
                display: 'block',
            }
        };
    };

    return (
        <div className="h-[calc(100vh-12rem)] bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.MONTH}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                eventPropGetter={eventStyleGetter}
                style={{ height: '100%' }}
                className="dark:text-zinc-300"
            />
        </div>
    );
}
