'use client';

import {
    MDXEditor,
    MDXEditorMethods,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    tablePlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    InsertThematicBreak,
    ListsToggle
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './mdx-editor.css';
import { useRef } from 'react';

// Custom dark mode styles for MDXEditor to match the app
// We need to override some CSS variables when in dark mode
// Ideally this should be in a global css or a module, but we'll try to rely on the 'dark' class of the parent

export interface MDXEditorProps {
    markdown: string;
    onChange?: (markdown: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

export function MDXEditorComponent({ markdown, onChange, placeholder, autoFocus }: MDXEditorProps) {
    const ref = useRef<MDXEditorMethods>(null);

    return (
        <div className="mdx-editor-wrapper h-full flex flex-col">
            <MDXEditor
                ref={ref}
                markdown={markdown}
                onChange={onChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
                contentEditableClassName="prose prose-zinc dark:prose-invert max-w-none focus:outline-none h-full min-h-[500px] px-4 py-2 bg-transparent"
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    tablePlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    imagePlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <BlockTypeSelect />
                                <CodeToggle />
                                <CreateLink />
                                <InsertTable />
                                <ListsToggle />
                                <InsertThematicBreak />
                            </>
                        )
                    })
                ]}
                className="h-full flex flex-col"
            />
        </div>
    );
}

// Styling note: MDXEditor contentEditableClassName handles the content styling via Tailwind Typography plugin (prose).
// The toolbar styling might need some global CSS overrides to look perfect in dark mode if MDXEditor doesn't detect it automatically.
