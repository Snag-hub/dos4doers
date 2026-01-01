import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Test endpoint for email delivery
 * Usage: GET /api/test-email?to=your@email.com
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const to = searchParams.get('to');

        if (!to) {
            return NextResponse.json(
                { error: 'Missing "to" query parameter' },
                { status: 400 }
            );
        }

        const testHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #18181b; margin: 0; font-size: 24px;">✅ Email Test Successful!</h1>
                </div>
                <p>Hi there,</p>
                <p>This is a test email from your DayOS application using <strong>Resend</strong>.</p>
                <p>If you're seeing this, your email system is working correctly! 🎉</p>
                <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
                <p style="font-size: 12px; color: #a1a1aa; text-align: center;">
                    Sent at ${new Date().toISOString()}
                </p>
            </div>
        `;

        const result = await sendEmail({
            to,
            subject: 'DayOS Email Test - Resend Integration',
            html: testHtml,
        });

        return NextResponse.json({
            success: true,
            message: 'Test email sent successfully',
            emailId: result?.id,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Test email failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
