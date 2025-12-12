import {
  timestamp,
  pgTable,
  text,
  boolean,
} from 'drizzle-orm/pg-core';

// Simplified users table for Clerk
export const users = pgTable('user', {
  id: text('id')
    .notNull()
    .primaryKey(), // Clerk user ID
  name: text('name'),
  email: text('email')
    .notNull(),
  image: text('image'),
  apiToken: text('apiToken'),
  createdAt: timestamp('createdAt')
    .notNull()
    .defaultNow(),
});

export const items = pgTable('items', {
  id: text('id')
    .notNull()
    .primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  url: text('url')
    .notNull(),
  title: text('title'),
  image: text('image'),
  description: text('description'),
  read: boolean('read')
    .notNull()
    .default(false),
  createdAt: timestamp('createdAt')
    .notNull()
    .defaultNow(),
});
