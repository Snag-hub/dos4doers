import {
  timestamp,
  pgTable,
  text,
  boolean,
  pgEnum,
  integer,
  primaryKey,
  index,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

export const statusEnum = pgEnum('status', ['inbox', 'reading', 'archived', 'trash']);
export const itemTypeEnum = pgEnum('item_type', ['article', 'video', 'social', 'other']);
export const recurrenceEnum = pgEnum('recurrence', ['none', 'daily', 'weekly', 'monthly']);
export const userStatusEnum = pgEnum('user_status', ['active', 'waitlist']);

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  apiToken: text('apiToken'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  emailNotifications: boolean('emailNotifications').default(true).notNull(),
  pushNotifications: boolean('pushNotifications').default(true).notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  lastDailyDigestAt: timestamp('lastDailyDigestAt'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

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
