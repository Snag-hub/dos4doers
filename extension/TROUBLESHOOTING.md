# Extension Troubleshooting Checklist

Use this checklist to quickly diagnose and fix common issues with the Read-Later browser extension.

## ✅ Pre-Flight Checklist

Before reporting an issue, verify these basics:

- [ ] Web app is running (`npm run dev` in project directory)
- [ ] Can access `http://localhost:3000` in browser
- [ ] Signed in to your account
- [ ] Extension is loaded in browser
- [ ] Extension icon is visible in toolbar

---

## 🔍 Common Issues & Solutions

### Issue: Extension icon not visible

**Symptoms:**
- Extension installed but icon doesn't appear in toolbar

**Solutions:**
1. **Chrome/Edge:**
   - Click the puzzle piece icon (Extensions)
   - Find "Read-Later Extension"
   - Click the pin icon to pin it to toolbar

2. **Firefox:**
   - Right-click toolbar
   - Select "Customize Toolbar"
   - Drag extension icon to toolbar

---

### Issue: "Failed to save page" error

**Symptoms:**
- Click "Save Page" button
- Get error message "Failed to save page"

**Diagnostic Steps:**

1. **Check if web app is running:**
   ```bash
   # In project directory
   npm run dev
   ```
   - Should see "Ready on http://localhost:3000"

2. **Verify API endpoint:**
   - Open browser console (F12 → Console)
   - Click "Save Page" again
   - Look for network errors
   - Should see POST to `http://localhost:3000/api/items`

3. **Check API token:**
   - Click extension icon
   - Click "Change Token"
   - Go to `http://localhost:3000/settings`
   - Generate new token
   - Paste in extension

4. **Check browser console:**
   - Right-click extension icon → Inspect popup
   - Look for JavaScript errors
   - Common errors:
     - `Failed to fetch` = Web app not running
     - `401 Unauthorized` = Invalid token
     - `CORS error` = Wrong URL in extension

---

### Issue: "Please set your API token" message

**Symptoms:**
- Extension shows token input screen every time

**Solutions:**

1. **Generate token:**
   - Go to `http://localhost:3000/settings`
   - Click "Generate Token"
   - Copy the token

2. **Save token in extension:**
   - Click extension icon
   - Paste token
   - Click "Save Token"
   - Should switch to main screen

3. **Check browser storage:**
   - Right-click extension icon → Inspect popup
   - Go to Application/Storage tab
   - Check "Local Storage" → Extension
   - Should see `apiToken` key

---

### Issue: Extension won't load

**Symptoms:**
- Error when loading extension
- Extension appears grayed out

**Chrome/Edge Solutions:**

1. **Check manifest errors:**
   - Go to `chrome://extensions/`
   - Look for error messages under extension
   - Common issues:
     - Missing files
     - Invalid manifest.json
     - Wrong path selected

2. **Reload extension:**
   - Click refresh icon on extension card
   - If errors persist, remove and re-add

3. **Check file structure:**
   ```
   extension/
   ├── manifest.json      ✓ Must exist
   ├── popup.html         ✓ Must exist
   ├── popup.js          ✓ Must exist
   ├── background.js     ✓ Must exist
   └── icons/
       └── icon-48.png   ✓ Must exist
   ```

**Firefox Solutions:**

1. **Check console:**
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Inspect" next to extension
   - Look for errors in console

2. **Reload extension:**
   - Click "Reload" button
   - If errors persist, remove and re-add

---

### Issue: Token keeps getting lost

**Symptoms:**
- Have to re-enter token frequently
- Token doesn't persist

**Solutions:**

1. **Check browser storage permissions:**
   - Extension needs `storage` permission
   - Verify in `manifest.json`:
     ```json
     "permissions": [
       "activeTab",
       "storage"
     ]
     ```

2. **Firefox temporary extension:**
   - Temporary extensions lose storage when browser closes
   - This is normal behavior in Firefox developer mode
   - You'll need to re-enter token each session

3. **Clear and reset:**
   - Right-click extension icon → Inspect popup
   - Console tab, run:
     ```javascript
     chrome.storage.local.clear()
     ```
   - Reload extension
   - Re-enter token

---

### Issue: Wrong page URL being saved

**Symptoms:**
- Saved page has wrong URL
- Extension saves extension popup URL instead

**Solutions:**

1. **Check active tab permission:**
   - Extension needs `activeTab` permission
   - Should be in manifest.json

2. **Reload extension:**
   - Changes to permissions require reload
   - Chrome: `chrome://extensions/` → Reload
   - Firefox: `about:debugging` → Reload

3. **Check browser console:**
   - Inspect popup
   - Look for tab query errors

---

### Issue: CORS errors

**Symptoms:**
- Console shows CORS policy errors
- Can't connect to API

**Solutions:**

1. **Check API URL:**
   - Extension is hardcoded to `http://localhost:3000`
   - If app runs on different port, update `popup.js` line 95:
     ```javascript
     const response = await fetch('http://localhost:YOUR_PORT/api/items', {
     ```

2. **Verify app is running:**
   - Must be on localhost:3000
   - Check terminal for port number

---

## 🔧 Advanced Debugging

### Enable verbose logging

1. **Inspect extension popup:**
   - Right-click extension icon
   - Select "Inspect" or "Inspect popup"

2. **Check background page:**
   - Chrome: `chrome://extensions/` → Details → Inspect views: background page
   - Firefox: `about:debugging` → Inspect

3. **Monitor network requests:**
   - In popup inspector, go to Network tab
   - Click "Save Page"
   - Check request/response

### Test API manually

```bash
# Test if API is working
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"url":"https://example.com"}'
```

Expected response:
```json
{"success": true, "item": {...}}
```

### Check database

1. **Verify item was saved:**
   - Go to `http://localhost:3000`
   - Check your saved items list
   - Should see the URL you saved

---

## 📊 Diagnostic Information to Collect

When reporting an issue, include:

- [ ] Browser name and version
- [ ] Operating system
- [ ] Extension version (from manifest.json)
- [ ] Error messages from browser console
- [ ] Error messages from extension popup console
- [ ] Network tab screenshot showing failed request
- [ ] Steps to reproduce the issue

---

## 🆘 Still Having Issues?

1. **Check project TODO.md** for known issues
2. **Review EXTENSION_GUIDE.md** for detailed setup
3. **Check browser console** for specific errors
4. **Try in different browser** to isolate issue
5. **Reinstall extension** from scratch

---

## 📝 Quick Command Reference

**Start web app:**
```bash
cd d:\Git\unnamed_tool
npm run dev
```

**Access settings:**
- URL: `http://localhost:3000/settings`

**Reload extension:**
- Chrome: `chrome://extensions/` → Reload button
- Firefox: `about:debugging` → Reload button

**View extension console:**
- Right-click extension icon → Inspect popup

**Clear extension storage:**
```javascript
// In extension console
chrome.storage.local.clear()
// or for Firefox
browser.storage.local.clear()
```

---

**Last Updated:** 2025-12-12
