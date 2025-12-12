# Extension Testing Checklist

Use this checklist to thoroughly test the browser extension before deployment or after making changes.

## 🧪 Pre-Testing Setup

- [ ] Web app is running at `http://localhost:3000`
- [ ] Database is accessible and working
- [ ] User account exists and can sign in
- [ ] API token can be generated from settings
- [ ] Extension files are in `extension/` folder
- [ ] No syntax errors in extension files

---

## 🌐 Browser Compatibility Testing

### Chrome Testing

#### Installation
- [ ] Navigate to `chrome://extensions/`
- [ ] Enable Developer mode
- [ ] Click "Load unpacked"
- [ ] Select `extension` folder
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] No error messages in extensions page

#### Functionality
- [ ] Click extension icon - popup opens
- [ ] Token input field is visible
- [ ] Can paste token into field
- [ ] "Save Token" button works
- [ ] Token is saved (check storage)
- [ ] UI switches to main view
- [ ] "Save Page" button is visible
- [ ] Can save current page
- [ ] Success message appears
- [ ] "Change Token" button works
- [ ] Can switch back to token view

#### Error Handling
- [ ] Shows error if web app is not running
- [ ] Shows error if token is invalid
- [ ] Shows error if URL cannot be saved
- [ ] Error messages are clear and helpful

---

### Edge Testing

#### Installation
- [ ] Navigate to `edge://extensions/`
- [ ] Enable Developer mode
- [ ] Click "Load unpacked"
- [ ] Select `extension` folder
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] No error messages in extensions page

#### Functionality
- [ ] All Chrome functionality tests pass
- [ ] Extension behaves identically to Chrome

---

### Firefox Testing

#### Installation
- [ ] Navigate to `about:debugging#/runtime/this-firefox`
- [ ] Click "Load Temporary Add-on"
- [ ] Select `manifest.json` from `extension` folder
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] No error messages in debugging page

#### Functionality
- [ ] Click extension icon - popup opens
- [ ] Token input field is visible
- [ ] Can paste token into field
- [ ] "Save Token" button works
- [ ] Token is saved (check storage)
- [ ] UI switches to main view
- [ ] "Save Page" button is visible
- [ ] Can save current page
- [ ] Success message appears
- [ ] "Change Token" button works
- [ ] Can switch back to token view

#### Firefox-Specific
- [ ] Browser API works (not just Chrome API)
- [ ] Storage persists during session
- [ ] Extension works after reload
- [ ] No console warnings about deprecated APIs

---

## 🔧 Functional Testing

### Token Management

#### First Time Setup
- [ ] Extension shows token input on first open
- [ ] Placeholder text is visible
- [ ] Input field accepts paste
- [ ] Input field accepts typing
- [ ] "Save Token" button is enabled
- [ ] Clicking "Save Token" saves the token
- [ ] UI transitions to main view
- [ ] Success message appears briefly

#### Token Validation
- [ ] Valid token is accepted
- [ ] Invalid token shows error when used
- [ ] Empty token cannot be saved
- [ ] Whitespace is trimmed from token
- [ ] Token is stored securely
- [ ] Token persists after closing popup
- [ ] Token persists after browser restart (Chrome/Edge)

#### Token Updates
- [ ] "Change Token" button is visible in main view
- [ ] Clicking "Change Token" shows token input
- [ ] Can paste new token
- [ ] New token replaces old token
- [ ] Extension works with new token
- [ ] Old token no longer works

---

### Page Saving

#### Basic Saving
- [ ] Can save HTTP pages
- [ ] Can save HTTPS pages
- [ ] Can save pages with query parameters
- [ ] Can save pages with URL fragments
- [ ] Can save pages with special characters in URL
- [ ] Cannot save chrome:// pages (expected)
- [ ] Cannot save about: pages (expected)

#### Save Process
- [ ] Click "Save Page" button
- [ ] Button shows "Saving..." state
- [ ] Network request is sent to API
- [ ] Success message appears
- [ ] Message disappears after 2 seconds
- [ ] Page appears in web app
- [ ] Correct URL is saved
- [ ] Correct page title is saved (if applicable)

#### Error Scenarios
- [ ] Error if web app is not running
- [ ] Error if token is invalid/expired
- [ ] Error if network is offline
- [ ] Error if API returns error
- [ ] Error messages are user-friendly
- [ ] Can retry after fixing error

---

### UI/UX Testing

#### Visual Design
- [ ] Popup is 300px wide
- [ ] All text is readable
- [ ] Buttons are clearly visible
- [ ] Colors match design (#0070f3 blue)
- [ ] Hover states work on buttons
- [ ] No layout issues or overflow
- [ ] Consistent spacing and padding

#### Interactions
- [ ] Buttons respond to clicks
- [ ] Hover effects work
- [ ] Focus states are visible
- [ ] Tab navigation works
- [ ] Enter key submits forms
- [ ] Buttons are disabled when appropriate
- [ ] Loading states are clear

#### Responsiveness
- [ ] Popup fits in standard browser window
- [ ] Content doesn't overflow
- [ ] Scrolling works if needed
- [ ] Text wraps appropriately
- [ ] Works on different screen resolutions

---

## 🔒 Security Testing

### Token Security
- [ ] Token is stored in browser local storage
- [ ] Token is not visible in network requests (except Authorization header)
- [ ] Token input uses type="password"
- [ ] Token is not logged to console
- [ ] Token is not exposed in error messages
- [ ] Token can be regenerated if compromised

### API Security
- [ ] API requires valid token
- [ ] Invalid tokens are rejected
- [ ] Token is sent in Authorization header
- [ ] HTTPS is used (or HTTP for localhost only)
- [ ] No sensitive data in URL parameters

### Permissions
- [ ] Extension only requests necessary permissions
- [ ] `activeTab` permission works correctly
- [ ] `storage` permission works correctly
- [ ] No unnecessary permissions requested

---

## 🚀 Performance Testing

### Load Time
- [ ] Popup opens quickly (< 500ms)
- [ ] No lag when clicking extension icon
- [ ] UI renders immediately
- [ ] No flash of unstyled content

### Save Speed
- [ ] Page saves in < 2 seconds
- [ ] No noticeable delay
- [ ] UI remains responsive during save
- [ ] Multiple saves work without issues

### Resource Usage
- [ ] Extension doesn't slow down browser
- [ ] No memory leaks
- [ ] Background script is lightweight
- [ ] No excessive CPU usage

---

## 🔄 Integration Testing

### Web App Integration
- [ ] Saved pages appear in web app
- [ ] Correct URL is displayed
- [ ] Timestamp is accurate
- [ ] User association is correct
- [ ] Can view saved page in web app
- [ ] Can delete saved page from web app

### API Integration
- [ ] POST to `/api/items` works
- [ ] Request includes Authorization header
- [ ] Request body includes URL
- [ ] Response is JSON
- [ ] Success response is handled
- [ ] Error response is handled

### Database Integration
- [ ] Items are saved to database
- [ ] User ID is associated correctly
- [ ] Timestamps are recorded
- [ ] Duplicate URLs are handled appropriately

---

## 🐛 Edge Cases & Error Handling

### Unusual URLs
- [ ] Very long URLs (> 2000 characters)
- [ ] URLs with special characters
- [ ] URLs with Unicode characters
- [ ] URLs with multiple query parameters
- [ ] URLs with fragments (#)
- [ ] Data URLs (should fail gracefully)
- [ ] File URLs (should fail gracefully)

### Network Issues
- [ ] Offline mode (should show error)
- [ ] Slow network (should timeout appropriately)
- [ ] Server error 500 (should show error)
- [ ] Server error 404 (should show error)
- [ ] CORS errors (should show error)

### Token Issues
- [ ] Expired token (should show error)
- [ ] Deleted token (should show error)
- [ ] Token with wrong format
- [ ] Empty token
- [ ] Very long token

### Browser Issues
- [ ] Extension reload
- [ ] Browser restart
- [ ] Multiple tabs open
- [ ] Multiple windows open
- [ ] Incognito/Private mode

---

## 📱 Cross-Platform Testing

### Windows
- [ ] Works on Windows 10
- [ ] Works on Windows 11
- [ ] Chrome on Windows
- [ ] Edge on Windows
- [ ] Firefox on Windows

### macOS
- [ ] Works on macOS 11+
- [ ] Chrome on macOS
- [ ] Edge on macOS
- [ ] Firefox on macOS

### Linux
- [ ] Works on Ubuntu/Debian
- [ ] Chrome on Linux
- [ ] Firefox on Linux

---

## 📊 Regression Testing

After making changes, verify:

- [ ] All previous functionality still works
- [ ] No new bugs introduced
- [ ] Performance hasn't degraded
- [ ] UI hasn't broken
- [ ] API integration still works
- [ ] Token management still works
- [ ] Error handling still works

---

## ✅ Final Checks

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Code is formatted consistently
- [ ] Comments are clear and helpful
- [ ] No debug code left in

### Documentation
- [ ] README is up to date
- [ ] QUICK_START guide is accurate
- [ ] EXTENSION_GUIDE is accurate
- [ ] TROUBLESHOOTING guide covers issues
- [ ] Code comments are clear

### User Experience
- [ ] Installation is straightforward
- [ ] Token setup is clear
- [ ] Saving pages is intuitive
- [ ] Error messages are helpful
- [ ] Success feedback is clear

---

## 🎯 Test Results Template

```markdown
## Test Results - [Date]

**Tester:** [Your Name]
**Browser:** [Chrome/Edge/Firefox] [Version]
**OS:** [Windows/macOS/Linux] [Version]

### Installation: ✅ Pass / ❌ Fail
- Notes: 

### Token Management: ✅ Pass / ❌ Fail
- Notes:

### Page Saving: ✅ Pass / ❌ Fail
- Notes:

### UI/UX: ✅ Pass / ❌ Fail
- Notes:

### Security: ✅ Pass / ❌ Fail
- Notes:

### Performance: ✅ Pass / ❌ Fail
- Notes:

### Issues Found:
1. [Issue description]
2. [Issue description]

### Overall Status: ✅ Ready / ⚠️ Needs Work / ❌ Not Ready
```

---

## 🔄 Continuous Testing

### Before Each Commit
- [ ] Run basic functionality tests
- [ ] Check for console errors
- [ ] Verify no regressions

### Before Each Release
- [ ] Run full test suite
- [ ] Test on all supported browsers
- [ ] Test on all supported platforms
- [ ] Update documentation
- [ ] Create release notes

### After User Reports
- [ ] Reproduce reported issue
- [ ] Add test case for issue
- [ ] Fix issue
- [ ] Verify fix works
- [ ] Run regression tests

---

**Testing is crucial for quality!** Use this checklist regularly to ensure the extension works perfectly for all users. 🎯
