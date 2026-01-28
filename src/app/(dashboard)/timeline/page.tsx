import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getCalendarEvents } from '@/app/actions';
import CalendarView from './calendar-view';
import { startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';

export default async function TimelinePage({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>;
}) {
    const user = await currentUser();
    if (!user) {
        redirect('/');
    }

    const params = await searchParams;
    const selectedDate = params.date ? new Date(params.date) : new Date();

    // Fetch calendar events for a wider range (3 months)
    const start = subMonths(startOfMonth(selectedDate), 1);
    const end = addMonths(endOfMonth(selectedDate), 1);
    const events = await getCalendarEvents(start, end);

    return (
        <main className="p-4 md:p-8 h-full">
            <CalendarView initialEvents={events} />
        </main>
    );
}
