/**
 * Escapes text for safe interpolation into HTML (email templates, etc.).
 * Use this on any user-controlled or scraped-from-the-web string (item
 * titles/descriptions, feedback messages) before putting it in an HTML
 * template literal.
 */
export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
