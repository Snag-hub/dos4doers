'use server';

import { getSession } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import { escapeHtml } from '@/lib/html-escape';

export async function submitFeedback(message: string, path: string) {
    const session = await getSession();

    if (!session) {
        throw new Error('Unauthorized');
    }

    const email = escapeHtml(session.user.email);
    const name = escapeHtml(session.user.name || session.user.email);
    const safeMessage = escapeHtml(message);
    const safePath = escapeHtml(path);

    // Send email to admin (using the defined admin email or same as sender for now if not config)
    // Assuming admin email is configured or just hardcoded for beta.
    // For now, let's send it to the developer email if known, or just log it.
    // But requirement was "Email to admin".
    // I'll assume `process.env.ADMIN_EMAIL` or send to self.
    // Send email to admins
    const adminEmails = ['imsnag.1@gmail.com', 'contact.dos4doers@gmail.com', 'dos4doers@n1k-tech.com'];

    await Promise.all(adminEmails.map(to =>
        sendEmail({
            to,
            subject: `[Beta Feedback] from ${name}`,
            html: `
                <div style="font-family: sans-serif;">
                    <h2>New Feedback Received</h2>
                    <p><strong>User:</strong> ${name} (${email})</p>
                    <p><strong>Path:</strong> ${safePath}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${safeMessage}</p>
                </div>
            `
        })
    ));
}
