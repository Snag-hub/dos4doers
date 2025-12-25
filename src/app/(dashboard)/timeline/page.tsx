import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getTimelineEvents } from '@/app/actions';
import TimelineView from './timeline-view';

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

    // Fetch timeline events for the selected day
    const events = await getTimelineEvents(selectedDate);

    return (
        <main className="p-4 md:p-8 h-full">
            <TimelineView
                initialEvents={events}
                selectedDate={selectedDate}
            />
        </main>
    );
}
