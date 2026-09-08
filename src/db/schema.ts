import {
  timestamp,
  pgTable,
  text,
  boolean,
  pgEnum,
  integer,
  bigint,
  index,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['inbox', 'reading', 'archived', 'trash']);
export const itemTypeEnum = pgEnum('item_type', ['article', 'video', 'social', 'other']);
export const recurrenceEnum = pgEnum('recurrence', ['none', 'daily', 'weekly', 'monthly']);
export const userStatusEnum = pgEnum('user_status', ['active', 'waitlist']);

// Core Better Auth tables (user/session/account/verification). Shape follows
// Better Auth's Drizzle adapter conventions: https://www.better-auth.com/docs/adapters/drizzle
export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  // App-specific fields (declared as Better Auth `additionalFields` in src/lib/auth.ts)
  apiToken: text('apiToken'),
  emailNotifications: boolean('emailNotifications').default(true).notNull(),
  pushNotifications: boolean('pushNotifications').default(true).notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  lastDailyDigestAt: timestamp('lastDailyDigestAt'),
});

export const sessions = pgTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('account', {
  id: text('id').notNull().primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const verifications = pgTable('verification', {
  id: text('id').notNull().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const items = pgTable(
  'items',
  {
    id: text('id').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    title: text('title'),
    image: text('image'),
    description: text('description'),
    status: statusEnum('status').default('inbox').notNull(),
    type: itemTypeEnum('type').default('other').notNull(),
    isFavorite: boolean('isFavorite').default(false).notNull(),
    reminderAt: timestamp('reminderAt'),
    lockedAt: timestamp('lockedAt'),
    siteName: text('siteName'),
    favicon: text('favicon'),
    author: text('author'),
    duration: integer('duration'),
    viewCount: integer('viewCount').default(0).notNull(),
    lastViewedAt: timestamp('lastViewedAt'),
    content: text('content'),
    textContent: text('textContent'),
    read: boolean('read').notNull().default(false),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (t) => [
    index('items_user_status_created_idx').on(t.userId, t.status, t.createdAt),
    index('items_user_url_idx').on(t.userId, t.url),
    index('items_user_view_count_idx').on(t.userId, t.viewCount),
  ]
);

export const reminders = pgTable(
  'reminders',
  {
    id: text('id').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    itemId: text('itemId').references(() => items.id, { onDelete: 'cascade' }),
    title: text('title'),
    scheduledAt: timestamp('scheduledAt').notNull(),
    lockedAt: timestamp('lockedAt'),
    recurrence: recurrenceEnum('recurrence').default('none').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (t) => [index('reminders_user_scheduled_idx').on(t.userId, t.scheduledAt)]
);

export const pushSubscriptions = pgTable('push_subscriptions', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  endpoint: text('endpoint').notNull().unique(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const rateLimits = pgTable('rate_limits', {
  key: text('key').notNull().primaryKey(),
  count: integer('count').notNull().default(0),
  reset: timestamp('reset').notNull(),
});

// Better Auth's own rate limiter storage (separate from the app's custom
// `rate_limits` table above) — required for `rateLimit.storage: "database"`
// in src/lib/auth.ts so limits survive across serverless instances.
export const authRateLimits = pgTable('auth_rate_limit', {
  id: text('id').notNull().primaryKey(),
  key: text('key').notNull(),
  count: integer('count').notNull(),
  lastRequest: bigint('lastRequest', { mode: 'number' }).notNull(),
});

export const systemLogs = pgTable('system_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  level: text('level').notNull(),
  message: text('message').notNull(),
  stack: text('stack'),
  context: jsonb('context'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const notificationLogs = pgTable(
  'notification_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    channel: text('channel'),
    status: text('status').notNull(),
    error: text('error'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (t) => [index('notification_logs_user_created_idx').on(t.userId, t.createdAt)]
);
