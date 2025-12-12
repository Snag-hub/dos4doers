# Quick Start Guide - Read-Later Extension

## 🚀 5-Minute Setup

### 1. Start the Web App
```bash
npm run dev
```
App runs at: `http://localhost:3000`

### 2. Install Extension

**Chrome/Edge:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from the `extension` folder

### 3. Get API Token
1. Open `http://localhost:3000`
2. Sign in to your account
3. Go to Settings/API Tokens
4. Generate and copy your token

### 4. Configure Extension
1. Click the extension icon
2. Paste your API token
3. Click "Save Token"

### 5. Save Your First Page
1. Navigate to any webpage
2. Click the extension icon
3. Click "Save Page"
4. Done! ✅

---

## 📋 Common Commands

**Reload Extension (Chrome):**
- `chrome://extensions/` → Click refresh icon

**Reload Extension (Firefox):**
- `about:debugging` → Click "Reload"

**View Extension Logs:**
- Right-click extension icon → Inspect popup

---

## ⚡ Keyboard Shortcuts

You can add custom keyboard shortcuts:

**Chrome:**
- `chrome://extensions/shortcuts`

**Firefox:**
- `about:addons` → Gear icon → Manage Extension Shortcuts

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Extension not visible | Click puzzle icon → Pin extension |
| "Failed to save" | Check if app is running at localhost:3000 |
| "Set API token" | Generate token from web app settings |
| Page not saving | Check browser console (F12) for errors |

---

## 📁 Extension Files

```
extension/
├── manifest.json      # Configuration
├── popup.html         # UI
├── popup.js          # Logic
├── background.js     # Background tasks
└── icons/            # Extension icon
```

---

## 🔗 Useful Links

- Full Guide: `../EXTENSION_GUIDE.md`
- Web App: `http://localhost:3000`
- Extensions Page (Chrome): `chrome://extensions/`
- Extensions Page (Firefox): `about:debugging`

---

**Need more help?** See the full `EXTENSION_GUIDE.md` in the project root.
