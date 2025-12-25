'use client';

import { deleteProject, updateProject } from '@/app/task-actions';
import { useState } from 'react';
import { TrashIcon, PencilIcon, CheckIcon, XIcon } from 'lucide-react';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Project {
    id: string;
    name: string;
    color: string;
}

interface ManageProjectsDialogProps {
    projects: Project[];
    onClose: () => void;
}

export function ManageProjectsDialog({ projects, onClose }: ManageProjectsDialogProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editColor, setEditColor] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const startEdit = (project: Project) => {
        setEditingId(project.id);
        setEditName(project.name);
        setEditColor(project.color);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditColor('');
    };

    const handleSave = async (projectId: string) => {
        if (!editName.trim()) return;
        setIsPending(true);
        await updateProject(projectId, editName, editColor);
        setIsPending(false);
        setEditingId(null);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsPending(true);
        await deleteProject(deleteId);
        setIsPending(false);
        setDeleteId(null);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                <div className="relative bg-zinc-50 dark:bg-zinc-900/50 p-6 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Manage Projects</h3>
                    <button onClick={onClose} className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-0 max-h-[60vh] overflow-y-auto">
                    {projects.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500">
                            No projects found.
                        </div>
                    ) : (
                        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {projects.map(project => (
                                <li key={project.id} className="p-4 flex items-center gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    {editingId === project.id ? (
                                        <div className="flex-1 flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={editColor}
                                                onChange={(e) => setEditColor(e.target.value)}
                                                className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0"
                                            />
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="flex-1 rounded-md border-0 bg-white dark:bg-zinc-800 px-2 py-1.5 text-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-blue-500"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handleSave(project.id)}
                                                disabled={isPending}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-md dark:hover:bg-green-900/20"
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                disabled={isPending}
                                                className="p-1.5 text-zinc-400 hover:bg-zinc-100 rounded-md dark:hover:bg-zinc-800"
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: project.color }}
                                            />
                                            <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                                {project.name}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => startEdit(project)}
                                                    className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(project.id)}
                                                    className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md dark:hover:bg-red-900/20"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <ConfirmDialog
                isOpen={!!deleteId}
                title="Delete Project?"
                description="Are you sure you want to delete this project? Associated tasks will be preserved but unassigned."
                confirmText="Delete"
                variant="danger"
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}
