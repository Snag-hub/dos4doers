import nodemailer from 'nodemailer';

const emailServer = process.env.EMAIL_SERVER;
const emailFrom = process.env.EMAIL_FROM || 'DayOS <noreply@dayos.app>';

// Create a transporter using environment variables or fallback for dev
const transportConfig = process.env.EMAIL_SERVER
    ? process.env.EMAIL_SERVER
    : (process.env.EMAIL_SERVER_HOST && process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY)
        ? {
            host: process.env.EMAIL_SERVER_HOST,
            port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
            auth: {
                user: process.env.MAILJET_API_KEY,
                pass: process.env.MAILJET_SECRET_KEY
            }
        }
        : {
            streamTransport: true, // Fallback: logs to console if no server configured
            newline: 'windows',
        };

const transporter = nodemailer.createTransport(transportConfig as any);

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    // Check if we are incorrectly falling back to mock when we have a real config
    const isMock = (transportConfig as any).streamTransport === true;

    if (isMock && process.env.NODE_ENV !== 'production') {
        console.log('📧 [Mock Email] Server not configured. Logging details:');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        // console.log(`HTML: ${html}`); // verbose
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: emailFrom,
            to,
            subject,
            html,
        });
        console.log(`✅ Email sent to ${to}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('❌ Failed to send email:', error);
        throw error; // Re-throw to allow caller to handle/report
    }
}
