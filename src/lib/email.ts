import { Resend } from 'resend';

const emailFrom = process.env.EMAIL_FROM || 'DOs 4 DOERs <noreply@dos4doers.app>';

// Lazy initialization - only create client when needed
function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        return null;
    }
    return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Send an email using Resend
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content
 * @returns Promise with email result
 */
export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    // Validate inputs
    if (!to || !subject || !html) {
        console.error('❌ Email validation failed: Missing required fields');
        throw new Error('Missing required email fields');
    }

    // Check if Resend is configured
    const resend = getResendClient();
    if (!resend) {
        console.warn('⚠️  RESEND_API_KEY not configured. Email not sent.');
        if (process.env.NODE_ENV !== 'production') {
            console.log('📧 [Mock Email] Would have sent:');
            console.log(`   To: ${to}`);
            console.log(`   Subject: ${subject}`);
        }
        return null;
    }

    try {
        const startTime = Date.now();

        const { data, error } = await resend.emails.send({
            from: emailFrom,
            to: [to],
            subject,
            html,
        });

        const duration = Date.now() - startTime;

        if (error) {
            console.error('❌ Resend API error:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }

        console.log(`✅ Email sent successfully to ${to} (${duration}ms) - ID: ${data?.id}`);
        return data;
    } catch (error) {
        console.error('❌ Failed to send email:', error);
        throw error;
    }
}

/**
 * Send a batch of emails using Resend
 * @param emails - Array of email objects
 * @returns Promise with batch result
 */
export async function sendBatchEmails(emails: Array<{
    to: string;
    subject: string;
    html: string;
}>) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️  RESEND_API_KEY not configured. Batch emails not sent.');
        return null;
    }

    try {
        const results = await Promise.allSettled(
            emails.map(email => sendEmail(email))
        );

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        console.log(`📧 Batch email results: ${successful} sent, ${failed} failed`);

        return {
            successful,
            failed,
            results,
        };
    } catch (error) {
        console.error('❌ Batch email error:', error);
        throw error;
    }
}
