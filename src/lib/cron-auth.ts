import { timingSafeEqual } from 'crypto';

/**
 * Verifies the `Authorization: Bearer <CRON_SECRET>` header using a
 * constant-time comparison to avoid leaking the secret via response-time
 * differences.
 */
export function isValidCronRequest(req: Request): boolean {
    const authHeader = req.headers.get('authorization') || '';
    const expected = `Bearer ${process.env.CRON_SECRET || ''}`;

    const a = Buffer.from(authHeader);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;

    return timingSafeEqual(a, b);
}
