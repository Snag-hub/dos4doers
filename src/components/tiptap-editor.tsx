'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {
    Bold, Italic, Strikethrough, Code, List, ListOrdered,
    CheckSquare, Quote, Link as LinkIcon, Undo, Redo,
    Heading1, Heading2, Table as TableIcon
} from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

// --- Toolbar Component ---
const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
    className
}: {
    onClick: () => void,
    isActive?: boolean,
    disabled?: boolean,
    children: React.ReactNode,
    title?: string,
    className?: string
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
            "p-2 rounded-lg transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 shrink-0",
            isActive && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            disabled && "opacity-50 cursor-not-allowed",
            className
        )}
    >
        {children}
    </button>
);

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto no-scrollbar">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
                className="hidden sm:block"
            >
                <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Code"
                className="hidden sm:block"
            >
                <Code className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                <Heading2 className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Ordered List"
            >
                <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                isActive={editor.isActive('taskList')}
                title="Task List"
            >
                <CheckSquare className="w-4 h-4" />
            </ToolbarButton>

            <div className="hidden sm:block w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Quote"
                className="hidden sm:block"
            >
                <Quote className="w-4 h-4" />
            </ToolbarButton>

            <div className="hidden sm:block w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo"
            >
                <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo"
            >
                <Redo className="w-4 h-4" />
            </ToolbarButton>
        </div>
    );
};

// --- Main Component ---

interface TipTapEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

export function TipTapEditor({ value, onChange, placeholder = 'Start writing...', autoFocus = false }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            LinkExtension.configure({
                openOnClick: false,
                autolink: true,
            }),
            Placeholder.configure({
                placeholder,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: value, // Initial content (HTML)
        editorProps: {
            attributes: {
                class: 'prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[50vh] px-4 py-4 pb-20',
            },
        },
        onUpdate: ({ editor }) => {
            // Get HTML content
            const html = editor.getHTML();
            onChange(html);
        },
        immediatelyRender: false
    });

    // Handle external content changes
    useEffect(() => {
        if (editor && value) {
            const currentHTML = editor.getHTML();
            if (value !== currentHTML) {
                // We typically don't want to force update from parent while editing to avoid cursor jumps
                // editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    return (
        <div className="flex flex-col h-full md:border md:border-zinc-200 md:dark:border-zinc-800 md:rounded-xl overflow-hidden bg-transparent">
            {/* Toolbar - Sticky on mobile */}
            <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 md:bg-zinc-50 md:dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <EditorToolbar editor={editor} />
            </div>

            <div className="flex-1 overflow-y-auto cursor-text bg-transparent" onClick={() => editor?.chain().focus().run()}>
                <EditorContent editor={editor} className="bg-transparent" />
            </div>
        </div>
    );
}
