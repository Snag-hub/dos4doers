# DOs 4 DOERs: Project Overview

## 🌟 Vision
DOs 4 DOERs is a **productivity system** designed to bridge the gap between "Capture" and "Action". Unlike traditional read-later apps that become graveyards for links, or to-do apps that lack context, DOs 4 DOERs treats every captured item (Article, Video, Task, Meeting) as a time-based commitment.

**Core Philosophy:**
1.  **Capture Everything**: Frictionless saving from browser/mobile.
2.  **Plan Reality**: Everything has a "When".
3.  **Nudge, Don't Spam**: Smart notification loops (Push + Email) that respect your schedule.

---

## 🏗 Architecture

### Tech Stack
-   **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Framer Motion.
-   **Backend**: Next.js Server Actions, Drizzle ORM.
-   **Database**: PostgreSQL (Neon/Supabase).
-   **Auth**: Clerk.
-   **Notifications**:
    -   **Push**: Web Push Protocol (VAPID) + Service Workers.
    -   **Email**: Nodemailer (SMTP/Mailjet) + Custom HTML Templates.
    -   **Cron**: External Cron Service (triggering Vercel API routes).
-   **Browser Extension**: Chrome/Firefox Manifest V3 (JS, CSS).

### Key Systems
1.  **Capture Pipeline**:
    -   User saves URL via Extension/App.
    -   System fetches Metadata (OG Tags, Title, Image).
    -   Item saved to `items` table.
2.  **Notification Engine**:
    -   **Cron Job** runs daily/hourly.
    -   Checks `items` (assignments) and `reminders` (adhoc).
    -   Groups notifications by User.
    -   Sends **Email Digest** (with branding/favicons).
    -   Sends **Push Notification** (clickable).
    -   **Auto-Cleanup**: One-time reminders are deleted; Recurring ones rescheduled.

---

## 🧩 Current Features (v2.1)

### 1. Capture & Storage
-   **Smart Metadata**: Auto-extracts titles, images, and descriptions from URLs.
-   **Universal Save**: Browser Extension works on Chrome, Edge, and Firefox.
-   **Inbox**: Central feed for all saved content.

### 2. Smart Reminders
-   **Recurrence**: Daily, Weekly, Monthly options.
-   **Auto-Reschedule**: Recurring tasks move to the next slot automatically.
-   **One-Time Cleanup**: Completed reminders are wiped to keep DB clean.

### 3. Branding & UX
-   **Premium Design**: Glassmorphism, Dark Mode (OLED friendly), Smooth Animations.
-   **Rich Emails**: Notifications include the DOs 4 DOERs logo and source website favicons.
-   **Responsive**: "WhatsApp-style" mobile navigation (Bottom Tabs).

### 4. Reliability
-   **VAPID Encryption**: Secure push notifications.
-   **External Cron Support**: architecture allows bypassing Vercel Hobby limits.

---

## 📂 Project Structure
```
src/
├── app/
│   ├── (dashboard)/      # Protected routes (Inbox, Settings)
│   ├── api/
│   │   ├── cron/         # Scheduled jobs endpoint
│   │   └── items/        # API for Extension
│   └── layout.tsx        # Main app wrapper (Auth/Theme)
├── db/
│   ├── schema.ts         # Drizzle Database Schema
│   └── index.ts          # DB Connection
├── lib/
│   ├── email.ts          # Nodemailer Logic
│   └── metadata.ts       # URL Scraping Logic
└── ...
extension/                # Browser Extension Source
public/                   # Static Assets (Logos, Icons, SW)
```
