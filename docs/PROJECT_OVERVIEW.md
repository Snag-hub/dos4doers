# DOs 4 DOERs: Project Overview

## Vision

DOs 4 DOERs is a focused read-later product built around one loop:

1. Capture useful content quickly.
2. Read without distractions.
3. Re-surface important items with reminders.

This keeps the product intentionally narrow and fast.

---

## Current Product Scope

### Core capabilities
- URL capture (web app, mobile share, browser extension)
- Metadata extraction + reader content extraction
- Inbox/favorites/archive/trash lifecycle
- Item-specific reminders and general reminders
- Recurring reminders and snooze actions
- Push + email notification delivery

### Out of scope (removed)
- Notes
- Tasks
- Meetings
- Timeline/calendar view
- Tags/projects

---

## Architecture

### Stack
- Frontend: Next.js App Router + React + Tailwind
- Backend: Next.js server actions + API routes
- Database: PostgreSQL via Drizzle ORM
- Auth: Clerk
- Notifications: Web Push (VAPID) + Email (Resend)
- Extension: Manifest-based browser extension (Chrome/Firefox)

### Main data model
- `user`
- `items`
- `reminders`
- `push_subscriptions`
- `notification_logs`
- `rate_limits`
- `system_logs`
- auth/session tables (`account`, `session`, `verificationToken`)

---

## Runtime Flows

### Capture flow
1. Save URL from app/extension/share.
2. Extract metadata and content.
3. Store in `items` with default status `inbox`.

### Reminder flow
1. User creates reminder (`itemId` or general title).
2. Cron routes process due reminders.
3. Notifications are sent (push/email).
4. Recurring reminders are rescheduled; one-time reminders cleaned up.

---

## Repo Landmarks

- `src/app/actions.ts`: item/reminder core server actions
- `src/app/api/cron/*`: reminder/digest/cleanup jobs
- `src/app/api/items/route.ts`: extension-facing item API
- `src/app/api/reminders/route.ts`: extension/general reminder API
- `src/db/schema.ts`: reduced schema
- `src/lib/*`: metadata, reader, reminders, email, logging, user/beta helpers
- `extension/*`: extension source
