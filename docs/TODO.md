# Project Todos & Fixes

## 🔐 Clerk → Better Auth migration (done in code; DB + prod deploy steps remain)

**Code migration completed 2026-09-08** (`npm run build`, `npm test`, `npx tsc --noEmit` all pass).
Triggered by the move from `dos4doers.snagdev.in` to `dos4doers.n1k-tech.com`, which broke Clerk
(its custom Frontend API domain + Publishable Key were bound to the old domain — not a DNS-only
fix). Rather than re-point Clerk, replaced it with **Better Auth** (self-hosted, Drizzle-backed,
long-lived PWA-friendly sessions) per the decision recorded in this session.

### What changed
- `src/lib/auth.ts` / `src/lib/auth-client.ts` — Better Auth server instance + React client.
  Sessions last 90 days with a 1-day rolling refresh (`session.expiresIn`/`updateAge`), so an
  active user shouldn't be prompted to sign in again.
- `src/db/schema.ts` — `users`/`sessions`/`accounts`/`verifications` tables reshaped to Better
  Auth's Drizzle adapter conventions (dropped the old NextAuth-shaped `account`/`session`/
  `verificationToken` tables entirely). `status`/`apiToken`/notification prefs live on `users` as
  Better Auth `additionalFields`; the 50-user beta cap is now assigned in a
  `databaseHooks.user.create.before` hook instead of the old `enforceBetaLimit`/`ensureUser`
  lazy-insert dance (both removed — Better Auth creates the row directly at sign-up).
- `src/middleware.ts` — optimistic cookie check via `better-auth/cookies` (`getSessionCookie`)
  replacing `clerkMiddleware`.
- `src/app/api/auth/[...all]/route.ts` — new Better Auth route handler.
- Custom sign-in/sign-up pages (`src/app/sign-in`, `src/app/sign-up`, `src/components/auth-form.tsx`)
  replacing Clerk's hosted `<SignIn>`/`<SignUp>` components — full control per your preference.
- All `auth()`/`currentUser()`/`useUser()`/`useClerk()`/`<UserButton>` call sites (~20 files)
  swapped for `getSession()`/`getUserId()`/`getCurrentUserId()` (`src/lib/auth.ts`) or
  `useSession()`/`authClient` (`src/lib/auth-client.ts`).
- Removed entirely: `@clerk/nextjs`, `@clerk/themes`, `next-auth`, `@auth/drizzle-adapter`,
  `src/components/auth-buttons.tsx`, `src/components/clerk-buttons.tsx` (dead, unused),
  `src/types/next-auth.d.ts`, `src/lib/user.ts`.
- `next.config.ts` / `src/app/layout.tsx` — Clerk CSP entries and `clerk.dos4doers.snagdev.in`
  preconnect/dns-prefetch links removed.
- Fixed the old-domain references across the app (extension `popup.js`, error boundary, terms/
  privacy pages, test-reminder-email, `page.tsx`) to `dos4doers.n1k-tech.com`, and the broken
  `NEXTAUTH_URL`/`dos4doers.app` fallback in `src/lib/email.ts`, `cron/daily-digest`, and
  `test-reminder-email` now correctly uses `NEXT_PUBLIC_APP_URL`. `.env.local`'s typo'd
  `cLERK_SECRET_KEY` is gone; added `BETTER_AUTH_SECRET`/`BETTER_AUTH_URL`.
- `README.md`, `docs/PROJECT_OVERVIEW.md`, `.env.example`, `docs/EXTENSION_GUIDE.md`, `LICENSE.md`,
  `LICENSE_COMMONS_CLAUSE.md` updated to match (Better Auth, new domain).

### Done in this session, needs your awareness
- [x] **DB migration applied directly to the live DB** (the Supabase-hosted Postgres in
  `.env.local`'s `DATABASE_URL`/`DIRECT_URL` — not CockroachDB, in case that's a surprise; that
  may be a separate/older connection string). Dropped the dead, empty NextAuth-shaped
  `account`/`session`/`verificationToken` tables and recreated them in Better Auth's shape; added
  `user.updatedAt` and converted `user.emailVerified` from `timestamp` to `boolean` (existing
  values mapped to `true` where the timestamp was non-null). The `user` table's 3 existing rows
  were preserved untouched otherwise. Verified post-migration: table list and `user` column types
  match `src/db/schema.ts` exactly.
  - **Note:** `npm run db:generate`'s interactive rename-detection is confused by stale/drifted
    history in `drizzle/meta/*.json` (it referenced old table names like `notes`/`tasks`/
    `projects`/`meetings` that don't exist in `schema.ts` or the live DB — pre-existing drift, not
    caused by this migration). Given that, the migration above was applied as a hand-written SQL
    script matching the new `schema.ts` exactly, verified against the live DB's actual table list
    first. Going forward, prefer `npm run db:push` (diffs `schema.ts` against the live DB
    directly) over `npm run db:generate` (relies on the drifted journal/snapshot history) until
    that history is cleaned up or reset.
- [ ] **Set production env vars** on wherever `dos4doers.n1k-tech.com` is hosted:
  `BETTER_AUTH_SECRET` (generate a fresh one for prod, don't reuse the dev one — see
  `.env.example`), `BETTER_AUTH_URL=https://dos4doers.n1k-tech.com`,
  `NEXT_PUBLIC_APP_URL=https://dos4doers.n1k-tech.com`. Remove the old
  `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`/`CLERK_SECRET_KEY` vars there too.
- [ ] **Manually test the auth flow end-to-end** in a real browser (sign up, sign in, sign out,
  account deletion, extension token auth, waitlist redirect once >50 users) — this session
  verified build/typecheck/unit tests only, not an interactive browser session.
- [ ] Decide whether to add social login (Google/GitHub) via Better Auth plugins later — not
  needed today since nothing in the app currently depends on it.
- [ ] **No password-reset flow yet.** `emailAndPassword.sendResetPassword` isn't configured in
  `src/lib/auth.ts` — a user who forgets their password currently has no self-service recovery.
  `src/lib/email.ts` (Resend) is already wired up elsewhere, so this is a small addition when
  needed, just not done in this pass.
- [ ] **No email verification required.** `requireEmailVerification` is left at its default
  (`false`), so sign-up doesn't confirm the email is real/owned by the signer — fine for a
  single-user/tiny-beta app, worth revisiting before opening signups more broadly.

### Dependency upgrades available (not yet applied, unrelated to auth)
- Safe minor/patch bumps: `next` 16.1.1 → 16.3.4, `react`/`react-dom` 19.2.3 → 19.2.8,
  `googleapis` 169 → 178, `sharp` → 0.35.4, `zod` → 4.5.4, `resend` → 6.26.0, and others — `npm
  outdated` has the full list.
- Bigger/breaking, needs its own migration plan if pursued: `lucide-react` 0.471 → 1.x,
  `framer-motion` 12 → 13, `uuid` 13 → 14, `cookie` 1.x → 2.x.
- `npm audit` currently reports a number of high/critical advisories in transitive deps — worth a
  dedicated look separate from this migration.

## 🚨 Critical Fixes
- [x] **Duplicate Emails**: Fix the issue where users receive double daily digest emails at 17:59. Implemented idempotency with atomic DB locking.
- [ ] **Phone Notifications**: Investigate why PWA push notifications are not working.
  - [ ] Check Service Worker registration.
  - [ ] Add "Send Test Notification" button in Settings for easier debugging.

## 🎨 UI/UX Improvements
- [ ] **Email Template**: Redesign the "Daily Digest" email to be cleaner, responsive, and visually appealing.
- [x] **Danger Zone Visibility**: Investigate why the "Danger Zone" (Delete Account) section is missing for some users. Ensure consistent rendering.
- [x] **Sidebar User Management**: Create a dedicated `UserManagement` component in the sidebar to replace the simple User Button, offering better access to profile/settings.

## 📝 Plan
1. **Research**: Analyze `cron/daily-digest`, `push-sw.js`, and `settings/client.tsx`.
2. **Implement**: 
   - Add DB check for `lastDigestSentAt` (or similar logic).
   - Create `UserManagement` component.
   - Refactor email HTML.
   - Verify Service Worker loading.
3. **Verify**: Test all changes locally and deploying to preview if possible.
