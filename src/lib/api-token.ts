import { createHash } from 'crypto';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Extension API tokens are stored hashed (like a password), never in
 * plaintext, so a database read/leak doesn't hand out working credentials.
 * The plaintext value is only ever shown to the user once, at generation time.
 */
export function hashApiToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}

/**
 * Resolves the user id for a request authenticated via the browser
 * extension's `Authorization: Bearer <apiToken>` header, or null.
 */
export async function getUserIdFromBearerToken(req: Request): Promise<string | null> {
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

    const token = authHeader.slice('Bearer '.length);
    const user = await db.query.users.findFirst({
        where: eq(users.apiToken, hashApiToken(token)),
        columns: { id: true },
    });
    return user?.id ?? null;
}
