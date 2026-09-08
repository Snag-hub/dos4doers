import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';
import { count } from 'drizzle-orm';
import { db } from '@/db';
import { users, sessions, accounts, verifications } from '@/db/schema';

const MAX_BETA_USERS = 50;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    // Long-lived, PWA-friendly sessions: an active user keeps getting
    // refreshed and effectively never has to sign in again.
    expiresIn: 60 * 60 * 24 * 90, // 90 days
    updateAge: 60 * 60 * 24, // refresh once a day of activity
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      apiToken: { type: 'string', required: false, input: false },
      status: {
        type: ['active', 'waitlist'],
        required: false,
        defaultValue: 'active',
        input: false,
      },
      emailNotifications: { type: 'boolean', required: false, defaultValue: true },
      pushNotifications: { type: 'boolean', required: false, defaultValue: true },
      lastDailyDigestAt: { type: 'date', required: false, input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const [row] = await db.select({ value: count() }).from(users);
          const status = row.value >= MAX_BETA_USERS ? 'waitlist' : 'active';
          return { data: { ...user, status } };
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Throws if there's no session, mirroring the old `currentUser()`/`ensureUser()`
 * contract so call sites that expect a guaranteed user id don't need to change.
 */
export async function getCurrentUserId() {
  const session = await getSession();
  if (!session) {
    throw new Error('User not authenticated');
  }
  return session.user.id;
}

/**
 * Mirrors the old Clerk `const { userId } = await auth()` shape (nullable,
 * no throw) for call sites that just want an id-or-null.
 */
export async function getUserId() {
  const session = await getSession();
  return session?.user.id ?? null;
}
