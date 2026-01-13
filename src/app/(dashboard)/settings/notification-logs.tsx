'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

interface Log {
    id: string;
    type: string;
    status: string;
    error: string | null;
    createdAt: string;
    channel: string | null;
}

export function NotificationLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/logs/notifications');
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && logs.length === 0) {
            fetchLogs();
        }
    }, [isOpen]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
                View Notification Logs
            </button>
        );
    }

    return (
        <div className="mt-4 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden animate-in slide-in-from-top-2">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Recent Notifications</h4>
                <div className="flex gap-2">
                    <button onClick={fetchLogs} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <RefreshCw className={`w-3 h-3 text-zinc-500 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-600">Close</button>
                </div>
            </div>

            <div className="max-h-60 overflow-y-auto bg-white dark:bg-zinc-950 p-0 text-xs">
                {isLoading && logs.length === 0 ? (
                    <div className="p-4 flex justify-center text-zinc-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-4 text-center text-zinc-400 italic">No logs found</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/30 text-zinc-400 font-medium sticky top-0">
                            <tr>
                                <th className="p-2 pl-4">Time</th>
                                <th className="p-2">Type</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {logs.map(log => (
                                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="p-2 pl-4 text-zinc-500 font-mono whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        <div className="text-[10px] opacity-50">{new Date(log.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="p-2 font-bold text-zinc-700 dark:text-zinc-300 uppercase text-[10px]">{log.type}</td>
                                    <td className="p-2">
                                        {log.status === 'success' ? (
                                            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-bold px-1.5 py-0.5 rounded-md bg-green-50 dark:bg-green-900/20">
                                                <CheckCircle2 className="w-3 h-3" /> OK
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded-md bg-red-50 dark:bg-red-900/20">
                                                <AlertCircle className="w-3 h-3" /> FAIL
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2 text-zinc-500 max-w-[200px] truncate" title={log.error || log.channel || ''}>
                                        {log.error ? (
                                            <span className="text-red-500">{log.error}</span>
                                        ) : (
                                            <span className="font-mono text-[10px]">{log.channel?.slice(0, 20)}...</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
