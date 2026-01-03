'use server';

import { currentUser } from '@clerk/nextjs/server';
import { sendEmail } from '@/lib/email';

export async function submitFeedback(message: string, path: string) {
    const user = await currentUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const name = `${user.firstName} ${user.lastName}`;

    // Send email to admin (using the defined admin email or same as sender for now if not config)
    // Assuming admin email is configured or just hardcoded for beta.
    // For now, let's send it to the developer email if known, or just log it.
    // But requirement was "Email to admin".
    // I'll assume `process.env.ADMIN_EMAIL` or send to self.
    // Send email to admins
    const adminEmails = ['imsnag.1@gmail.com', 'contact.dos4doers@gmail.com'];

    await Promise.all(adminEmails.map(to =>
        sendEmail({
            to,
            subject: `[Beta Feedback] from ${name}`,
            html: `
                <div style="font-family: sans-serif;">
                    <h2>New Feedback Received</h2>
                    <p><strong>User:</strong> ${name} (${email})</p>
                    <p><strong>Path:</strong> ${path}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `
        })
    ));
}
