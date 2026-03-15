# Manual Testing Checklist

Use this checklist before release. Scope is the reduced product: capture + read + reminders.

---

## 1) Authentication and Access

- [ ] Sign up with email works
- [ ] Sign in with email/provider works
- [ ] Protected routes redirect when signed out
- [ ] Signed-in user reaches inbox
- [ ] Waitlist/active gating behaves as expected

---

## 2) Capture Flow

- [ ] Save URL manually from app works
- [ ] Metadata extraction returns title/description/image when available
- [ ] Duplicate URL handling behaves correctly
- [ ] Mobile share flow saves to inbox
- [ ] Extension one-click save works with API token

---

## 3) Item Lifecycle

- [ ] Inbox lists newest items first
- [ ] Mark favorite/unfavorite works
- [ ] Update item title/reminder works
- [ ] Move item to archive works
- [ ] Move item to trash and restore works
- [ ] Empty trash works

---

## 4) Reader and Search

- [ ] Reader mode opens for supported content
- [ ] Reader content is sanitized and readable
- [ ] Omnisearch opens with shortcut (`Cmd/Ctrl+K`)
- [ ] Search returns item matches by title/url/content
- [ ] Clicking search result navigates correctly

---

## 5) Reminder System

- [ ] Create item-specific reminder works
- [ ] Create general reminder works
- [ ] Edit/delete reminder works
- [ ] Recurring reminder (daily/weekly/monthly) reschedules correctly
- [ ] Snooze action updates schedule correctly

---

## 6) Notifications

- [ ] Push subscription can be created
- [ ] Reminder push is delivered
- [ ] Push action endpoints (`snooze`, `mark-read`, `delete`) work
- [ ] Daily digest email runs and includes reminders/recently saved items
- [ ] Notification logs endpoint records delivery attempts

---

## 7) Settings and Account

- [ ] API token generation/regeneration works
- [ ] Email/push preference toggles persist
- [ ] Data export endpoint returns valid JSON
- [ ] Account deletion flow works

---

## 8) PWA and Mobile UX

- [ ] Service worker registers
- [ ] Offline banner appears on disconnect
- [ ] Mobile nav works on small screens
- [ ] App is installable as PWA

---

## 9) Reliability and Security

- [ ] User isolation enforced (no cross-user data leakage)
- [ ] API token required for extension APIs
- [ ] Rate limiting behavior is enforced
- [ ] Input validation rejects malformed payloads

---

## 10) Final Release Gate

- [ ] `npm test -- --run` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run test:e2e` passes
- [ ] Docs updated for reduced scope
