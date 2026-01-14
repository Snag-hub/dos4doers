'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';

const CreateMeetingDialog = dynamic(() => import('./create-meeting-dialog').then(mod => mod.CreateMeetingDialog), {
    ssr: false,
});

export function NewMeetingButton() {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            {/* Desktop Button */}
            <button
                onClick={() => setShowDialog(true)}
                className="hidden sm:flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
            >
                <Calendar className="h-4 w-4" />
                New Meeting
            </button>

            {showDialog && (
                <CreateMeetingDialog onClose={() => setShowDialog(false)} />
            )}
        </>
    );
}
