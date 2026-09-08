import { sendEmail } from '@/lib/email';

const BRAND_COLOR = '#00D4FF';

function wrapper(title: string, bodyHtml: string) {
    return `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #18181b;">
            <h1 style="font-size: 20px; margin: 0 0 16px;">${title}</h1>
            ${bodyHtml}
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0 16px;" />
            <p style="font-size: 12px; color: #a1a1aa;">DOs 4 DOERs — Less planning. More doing.</p>
        </div>
    `;
}

export async function sendVerificationEmail(email: string, url: string) {
    await sendEmail({
        to: email,
        subject: 'Verify your email — DOs 4 DOERs',
        html: wrapper('Verify your email', `
            <p>Click the button below to verify your email address and finish setting up your account.</p>
            <p style="margin: 24px 0;">
                <a href="${url}" style="display: inline-block; background: ${BRAND_COLOR}; color: #08111a; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600;">
                    Verify email
                </a>
            </p>
            <p style="font-size: 13px; color: #71717a;">This link expires in 1 hour. If you didn't create an account, you can ignore this email.</p>
        `),
    });
}

export async function sendPasswordResetEmail(email: string, url: string) {
    await sendEmail({
        to: email,
        subject: 'Reset your password — DOs 4 DOERs',
        html: wrapper('Reset your password', `
            <p>We received a request to reset your password. Click the button below to choose a new one.</p>
            <p style="margin: 24px 0;">
                <a href="${url}" style="display: inline-block; background: ${BRAND_COLOR}; color: #08111a; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600;">
                    Reset password
                </a>
            </p>
            <p style="font-size: 13px; color: #71717a;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't change.</p>
        `),
    });
}
