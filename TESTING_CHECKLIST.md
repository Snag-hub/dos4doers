# Manual Testing Checklist - Pre-Launch

## Overview
Complete this checklist before releasing DayOS to early users. Test on multiple devices and browsers to ensure a smooth user experience.

---

## 1. Authentication & Onboarding

### Sign Up Flow
- [ ] Sign up with email works
- [ ] Sign up with Google works
- [ ] Sign up with GitHub works
- [ ] Email verification sent and received
- [ ] User redirected to inbox after signup
- [ ] User profile created correctly

### Sign In Flow
- [ ] Sign in with email works
- [ ] Sign in with Google works
- [ ] Sign in with GitHub works
- [ ] Remember me functionality works
- [ ] Forgot password flow works
- [ ] User redirected to last visited page

### Sign Out
- [ ] Sign out button works
- [ ] User redirected to home page
- [ ] Session cleared properly
- [ ] Cannot access protected routes after signout

---

## 2. Core Features - Saving Items

### Manual Save (Web App)
- [ ] Click "+" button opens save dialog
- [ ] Paste URL and save works
- [ ] Metadata extracted correctly (title, description, image)
- [ ] Item appears in inbox immediately
- [ ] Toast notification shows success
- [ ] Invalid URL shows error message

### Browser Extension
- [ ] Extension icon visible in toolbar
- [ ] Click extension icon saves current page
- [ ] Right-click menu "Save to DayOS" works
- [ ] Keyboard shortcut (Ctrl+Shift+S) works
- [ ] Extension shows success notification
- [ ] Extension shows error for invalid pages

### Share to DayOS (Mobile)
- [ ] Share sheet shows DayOS option
- [ ] Sharing from browser works
- [ ] Sharing from other apps works
- [ ] Item saved correctly

---

## 3. Inbox Management

### Viewing Items
- [ ] Inbox loads all saved items
- [ ] Items display correctly (title, image, description)
- [ ] Favicon shows for each item
- [ ] Date saved displays correctly
- [ ] Tags display if present
- [ ] Notes preview shows if attached

### Item Actions
- [ ] Click item title opens URL in new tab
- [ ] Favorite button toggles correctly
- [ ] Edit button opens edit dialog
- [ ] Edit dialog saves changes
- [ ] Reminder button opens scheduler
- [ ] Archive button moves to archive
- [ ] Delete button moves to trash
- [ ] "Read" button opens reader view (if content available)

### Infinite Scroll
- [ ] Scroll to bottom loads more items
- [ ] Loading spinner shows while fetching
- [ ] No duplicate items loaded
- [ ] Works smoothly without jank

### Selection & Bulk Actions
- [ ] Click checkbox selects item
- [ ] Selection bar appears at bottom
- [ ] "Select All" works
- [ ] Bulk archive works
- [ ] Bulk delete works
- [ ] Bulk favorite works
- [ ] Clear selection works

---

## 4. Search & Filtering

### Search
- [ ] Search bar accessible from all pages
- [ ] Typing shows results
- [ ] Results update as you type (debounced)
- [ ] Click result navigates to item
- [ ] Search works across title, description, content
- [ ] Empty search shows all items

### Filters
- [ ] Filter by type (article, video, pdf) works
- [ ] Filter by status (inbox, archived, trash) works
- [ ] Filter by tags works
- [ ] Filter by favorites works
- [ ] Multiple filters work together
- [ ] Clear filters works

---

## 5. Notes

### Creating Notes
- [ ] "Add Note" button works
- [ ] Note editor opens
- [ ] Can type in note editor
- [ ] Save note works
- [ ] Note appears in notes list
- [ ] Note attached to item if from item page

### Editing Notes
- [ ] Click note opens editor
- [ ] Edit note content works
- [ ] Save changes works
- [ ] Delete note works
- [ ] Confirm delete dialog shows

### Viewing Notes
- [ ] Notes page shows all notes
- [ ] Notes filtered by item works
- [ ] Note preview shows content
- [ ] Click note opens full view

---

## 6. Tasks

### Creating Tasks
- [ ] "New Task" button works
- [ ] Task form opens
- [ ] Can enter title, description
- [ ] Can set due date
- [ ] Can set priority
- [ ] Can assign to project
- [ ] Save task works

### Managing Tasks
- [ ] Tasks list shows all tasks
- [ ] Check task marks as complete
- [ ] Uncheck task marks as incomplete
- [ ] Edit task works
- [ ] Delete task works
- [ ] Filter by status works
- [ ] Filter by priority works
- [ ] Sort by due date works

---

## 7. Meetings

### Creating Meetings
- [ ] "New Meeting" button works
- [ ] Meeting form opens
- [ ] Can enter title, description
- [ ] Can set start/end time
- [ ] Can add location
- [ ] Can add attendees
- [ ] Save meeting works

### Managing Meetings
- [ ] Meetings list shows all meetings
- [ ] Upcoming meetings highlighted
- [ ] Past meetings grayed out
- [ ] Edit meeting works
- [ ] Delete meeting works
- [ ] Calendar view works

---

## 8. Timeline

### Calendar View
- [ ] Timeline page loads
- [ ] Calendar displays current month
- [ ] Items shown on correct dates
- [ ] Click date shows items for that day
- [ ] Navigate to previous/next month works
- [ ] Today button returns to current date

---

## 9. Settings

### Preferences
- [ ] Email notifications toggle works
- [ ] Push notifications toggle works
- [ ] Theme toggle works (if implemented)
- [ ] Changes save automatically
- [ ] Toast confirmation shows

### Integrations
- [ ] Google Calendar sync button works
- [ ] Sync status shows correctly
- [ ] Disconnect integration works

### API Token
- [ ] Generate token button works
- [ ] Token displays correctly
- [ ] Copy token works
- [ ] Regenerate token works
- [ ] Token works in extension

### Reminders
- [ ] Add reminder works
- [ ] Edit reminder works
- [ ] Delete reminder works
- [ ] Recurring reminders work

### Extension Download
- [ ] Chrome/Edge download link works
- [ ] Firefox download link works
- [ ] Setup guide link works

### Legal Links
- [ ] Privacy Policy link works
- [ ] Terms of Service link works
- [ ] Links open in new tab

---

## 10. Archive & Trash

### Archive
- [ ] Archive page shows archived items
- [ ] Unarchive button works
- [ ] Item returns to inbox
- [ ] Delete from archive works

### Trash
- [ ] Trash page shows deleted items
- [ ] Restore button works
- [ ] Item returns to inbox
- [ ] Permanent delete works
- [ ] Confirm delete dialog shows
- [ ] Empty trash button works

---

## 11. PWA Features

### Installation
- [ ] Install prompt shows (desktop)
- [ ] Install prompt shows (mobile)
- [ ] Install button works
- [ ] App installs correctly
- [ ] App icon shows on home screen/desktop
- [ ] App opens in standalone mode

### Offline Support
- [ ] Offline banner shows when disconnected
- [ ] Cached pages load offline
- [ ] Online banner shows when reconnected
- [ ] Data syncs when back online

### Push Notifications
- [ ] Permission prompt shows
- [ ] Allow notifications works
- [ ] Test notification works
- [ ] Reminder notifications arrive
- [ ] Click notification opens app

---

## 12. Error Handling

### Error Boundary
- [ ] Intentional error shows error page
- [ ] "Try Again" button works
- [ ] "Reload Page" button works
- [ ] "Go Home" button works
- [ ] Error details show in dev mode

### Network Errors
- [ ] Failed API call shows error toast
- [ ] Retry works after network restored
- [ ] User-friendly error messages

### Validation Errors
- [ ] Invalid URL shows error
- [ ] Empty required fields show error
- [ ] Max length exceeded shows error
- [ ] Invalid email shows error

---

## 13. Performance

### Page Load
- [ ] Home page loads in <2s
- [ ] Inbox loads in <3s
- [ ] Search results appear in <1s
- [ ] No layout shift on load

### Scrolling
- [ ] Smooth 60fps scrolling
- [ ] No jank on mobile
- [ ] Infinite scroll smooth
- [ ] Images load progressively

### Interactions
- [ ] Buttons respond instantly
- [ ] Modals open smoothly
- [ ] Animations smooth
- [ ] No lag on input

---

## 14. Browser Compatibility

### Desktop
- [ ] Chrome (latest) - all features work
- [ ] Firefox (latest) - all features work
- [ ] Safari (latest) - all features work
- [ ] Edge (latest) - all features work

### Mobile
- [ ] iOS Safari - all features work
- [ ] Android Chrome - all features work
- [ ] iOS Chrome - all features work
- [ ] Android Firefox - all features work

---

## 15. Responsive Design

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] No horizontal scroll
- [ ] All features accessible
- [ ] Grid layout works

### Laptop (1366x768)
- [ ] Layout looks good
- [ ] No horizontal scroll
- [ ] All features accessible

### Tablet (768x1024)
- [ ] Layout adapts correctly
- [ ] Touch targets large enough
- [ ] No horizontal scroll
- [ ] Bottom nav shows

### Mobile (375x667)
- [ ] Layout adapts correctly
- [ ] Touch targets large enough
- [ ] No horizontal scroll
- [ ] Bottom nav works
- [ ] All text readable

### Mobile (320x568) - Smallest
- [ ] Layout still works
- [ ] No horizontal scroll
- [ ] All features accessible
- [ ] Text still readable

---

## 16. Accessibility

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Arrow keys navigate lists
- [ ] Focus visible on all elements

### Screen Reader
- [ ] All images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels
- [ ] Error messages announced
- [ ] Success messages announced

### Color Contrast
- [ ] Text readable in light mode
- [ ] Text readable in dark mode
- [ ] Links distinguishable
- [ ] Buttons have sufficient contrast

---

## 17. Security

### Authentication
- [ ] Cannot access protected routes without login
- [ ] Session expires after timeout
- [ ] CSRF protection works
- [ ] XSS attempts blocked

### API Security
- [ ] Rate limiting works (429 after limit)
- [ ] Invalid tokens rejected
- [ ] SQL injection attempts blocked
- [ ] Input validation works

### Data Privacy
- [ ] User can only see their own data
- [ ] API token required for extension
- [ ] Passwords not visible
- [ ] Sensitive data encrypted

---

## 18. Data Integrity

### Data Persistence
- [ ] Saved items persist after refresh
- [ ] Notes persist after refresh
- [ ] Tasks persist after refresh
- [ ] Preferences persist after refresh

### Data Export
- [ ] Export button works
- [ ] JSON file downloads
- [ ] All data included in export
- [ ] Export file valid JSON

### Data Sync
- [ ] Changes sync across devices
- [ ] No data loss on network issues
- [ ] Optimistic updates work
- [ ] Conflicts resolved correctly

---

## 19. Edge Cases

### Empty States
- [ ] Empty inbox shows helpful message
- [ ] Empty search shows helpful message
- [ ] Empty notes shows helpful message
- [ ] Empty tasks shows helpful message
- [ ] Empty trash shows helpful message

### Large Datasets
- [ ] 100+ items load correctly
- [ ] 1000+ items load correctly
- [ ] Search still fast with many items
- [ ] Scroll still smooth with many items

### Long Content
- [ ] Long titles truncate correctly
- [ ] Long descriptions truncate correctly
- [ ] Long URLs don't break layout
- [ ] Long notes scroll correctly

### Special Characters
- [ ] Emoji in titles work
- [ ] Special characters in URLs work
- [ ] Unicode characters work
- [ ] HTML in content escaped

---

## 20. Final Checks

### Pre-Launch
- [ ] All critical bugs fixed
- [ ] All features tested
- [ ] Documentation complete
- [ ] Privacy policy live
- [ ] Terms of service live
- [ ] Support email set up
- [ ] Error monitoring active (if Sentry)
- [ ] Analytics active (if implemented)
- [ ] Backup strategy in place

### Launch Day
- [ ] Production build successful
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Monitoring active
- [ ] Support team ready
- [ ] Rollback plan ready

---

## Testing Notes

**Devices Tested:**
- [ ] Desktop: Windows 11 / Chrome
- [ ] Desktop: macOS / Safari
- [ ] Mobile: iPhone / Safari
- [ ] Mobile: Android / Chrome

**Issues Found:**
(Document any issues discovered during testing)

**Sign-off:**
- Tester: _______________
- Date: _______________
- Status: [ ] PASS [ ] FAIL
