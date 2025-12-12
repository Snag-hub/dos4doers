# Project TODO

This TODO list is based on the "Read-later Engine — Full Project Canvas.pdf" document.

## 1. Project Setup
- [x] Create project (`npx create-next-app@latest read-later --ts` and choose App Router, TypeScript, Tailwind, ESLint) - *Already done based on file structure.*
- [x] Install packages (`npm install next-auth @neondatabase/serverless drizzle-orm drizzle-kit open-graph-scraper node-fetch cookie next-pwa`)
- [x] Configure `.env.local` with environment variables (DATABASE_URL, NEXTAUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, EMAIL_SERVER, EMAIL_FROM, NEXTAUTH_URL)
- [x] Setup Drizzle DB connection (`/src/db/index.ts`)
- [x] Create schema (`/src/db/schema.ts`)
- [x] Run Drizzle migrations (`npx drizzle-kit generate`, `npx drizzle-kit push`)
- [x] Implement NextAuth route (`/src/app/api/auth/[...nextauth]/route.ts`)
- [x] Protect API with middleware (`src/middleware.ts`)
- [x] Basic save route (`/src/app/api/items/route.ts`)
- [x] Inbox page (`/src/app/inbox/page.tsx`)
- [x] Implement API token generation for extension authentication

## 1.5. Authentication Migration (COMPLETED ✅)
- [x] **Migrate from NextAuth to Clerk**
  - [x] Install Clerk packages (`@clerk/nextjs`)
  - [x] Set up Clerk account and get API keys
  - [x] Remove NextAuth configuration and dependencies
  - [x] Update database schema (remove account, session, verificationToken tables)
  - [x] Keep items table and link to Clerk user IDs
  - [x] Update all authentication checks throughout the app
  - [x] Reconfigure API token system to work with Clerk
  - [x] Update middleware to use Clerk's auth middleware
  - [x] Test sign in/sign out flow
  - [x] Verify user creation in database
  - [x] Test API token generation in /settings
  - [x] Test browser extension authentication with API tokens

## 2. Metadata Extraction
- [x] Implement metadata extraction (`/src/lib/metadata.ts`)

## 3. PWA & Share Target
- [x] Place `manifest.webmanifest` under `/public`
- [x] Implement share target handler (`/src/app/share/route.ts`)
- [x] Service worker & caching strategy

## 4. Firefox Extension
- [x] Create `manifest.json`
- [x] Create `popup.html`
- [x] Create `popup.js`

## 5. Deployment & Testing
- [ ] Create NeonDB project and database
- [ ] Create Vercel project and connect to GitHub repo
- [ ] Add environment variables in Vercel dashboard
- [ ] Configure Clerk production environment
- [ ] Configure PWA assets (icons) and publish
- [ ] Publish Firefox extension
- [ ] Test share target on Android
- [ ] Run drizzle migrations against Neon in production
- [x] Local development setup (npm run dev, ngrok)
- [x] Test authentication
- [x] Test protected API routes
- [x] Test browser extension
