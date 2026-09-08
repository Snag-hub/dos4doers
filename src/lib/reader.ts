import { Readability } from '@mozilla/readability';
import { Window } from 'happy-dom';
import createDOMPurify from 'dompurify';
import { assertPublicHttpUrl } from '@/lib/ssrf-guard';

export interface ExtractedContent {
    content: string;
    textContent: string;
    excerpt: string;
}

/**
 * Re-sanitizes stored article HTML immediately before rendering it. Content
 * is already sanitized once at extraction time (below), but this is a cheap
 * backstop: if any future write path (import, edit, admin tool) ever stores
 * `items.content` without going through extractContent(), this still keeps
 * the render path safe on its own.
 */
export function sanitizeHtml(html: string): string {
    const window = new Window();
    const DOMPurify = createDOMPurify(window as unknown as any);
    return DOMPurify.sanitize(html);
}

export async function extractContent(url: string): Promise<ExtractedContent | null> {
    try {
        // Block requests to internal/private network targets (SSRF).
        await assertPublicHttpUrl(url);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'DOs4DOERs-Bot/1.0 (+https://dos4doers.n1k-tech.com)',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const html = await response.text();
        const window = new Window({ url });
        const document = window.document;
        document.write(html);

        // Initialize DOMPurify with the happy-dom window
        const DOMPurify = createDOMPurify(window as unknown as any);

        const reader = new Readability(document as unknown as Document);
        const article = reader.parse();

        if (!article) {
            return null;
        }

        return {
            content: DOMPurify.sanitize(article.content || ''),
            textContent: article.textContent || '',
            excerpt: article.excerpt || '',
        };
    } catch (error) {
        console.error('Content extraction failed:', error);
        return null;
    }
}
