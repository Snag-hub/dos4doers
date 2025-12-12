# Browser Extension Installation & Usage Guide

This guide will walk you through installing and using the Read-Later browser extension for Chrome and Firefox.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Chrome/Edge Installation](#chromeedge-installation)
  - [Firefox Installation](#firefox-installation)
- [Getting Your API Token](#getting-your-api-token)
- [Using the Extension](#using-the-extension)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before installing the extension, make sure you have:

1. **The web application running locally**
   - Navigate to your project directory in a terminal
   - Run `npm run dev` to start the development server
   - The app should be running at `http://localhost:3000`

2. **A user account**
   - Open `http://localhost:3000` in your browser
   - Sign in or create an account using Clerk authentication

---

## Installation

### Chrome/Edge Installation

1. **Open Chrome Extension Management Page**
   - Open Chrome/Edge browser
   - Navigate to `chrome://extensions/` (or `edge://extensions/` for Edge)
   - Alternatively, click the three-dot menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Look for the "Developer mode" toggle in the top-right corner
   - Turn it ON

   ![Developer Mode Toggle](https://via.placeholder.com/600x100/4285f4/ffffff?text=Developer+Mode+Toggle)

3. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to your project directory: `d:\Git\unnamed_tool\extension`
   - Select the `extension` folder and click "Select Folder"

4. **Verify Installation**
   - You should see "Read-Later Extension" appear in your extensions list
   - The extension icon should appear in your browser toolbar
   - If you don't see the icon, click the puzzle piece icon and pin the Read-Later extension

### Firefox Installation

1. **Open Firefox Add-ons Debug Page**
   - Open Firefox browser
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Alternatively, click the menu → Add-ons and themes → Settings icon (gear) → Debug Add-ons

2. **Load Temporary Add-on**
   - Click the "Load Temporary Add-on..." button
   - Navigate to your project directory: `d:\Git\unnamed_tool\extension`
   - Select the `manifest.json` file and click "Open"

3. **Verify Installation**
   - You should see "Read-Later Extension" appear in your temporary extensions list
   - The extension icon should appear in your browser toolbar

> **Note for Firefox:** Temporary extensions are removed when you close Firefox. You'll need to reload it each time you restart the browser during development.

---

## Getting Your API Token

The extension requires an API token to authenticate with your Read-Later application.

### Step 1: Access Your Settings Page

1. Open your browser and go to `http://localhost:3000`
2. Make sure you're signed in to your account
3. Navigate to **Settings** (usually in the navigation menu or user dropdown)
   - Direct link: `http://localhost:3000/settings`

### Step 2: Generate an API Token

1. On the Settings page, you'll see an "API Token" section
2. Click the **"Generate Token"** button (or "Regenerate Token" if you already have one)
3. The token will appear in a code box
4. Click the **"Copy"** button to copy it to your clipboard
   - **Important:** Save this token somewhere safe! If you regenerate it, you'll need to update the extension.

### Step 3: Configure the Extension

1. Click the Read-Later extension icon in your browser toolbar
2. You'll see a popup asking for your API Token
3. Paste your token into the input field
4. Click "Save Token"

The extension will remember your token and you're now ready to use it!

---

## Using the Extension

### Saving a Page

1. **Navigate to any webpage** you want to save for later reading
2. **Click the Read-Later extension icon** in your browser toolbar
3. **Click the "Save Page" button** in the popup
4. You'll see a success message: "Page saved successfully!"

The page is now saved to your Read-Later list and you can access it from the web application at `http://localhost:3000`.

### Changing Your API Token

If you need to update your API token:

1. Click the Read-Later extension icon
2. Click the "Change Token" button
3. Enter your new token
4. Click "Save Token"

---

## Troubleshooting

### Extension Icon Not Showing

**Chrome/Edge:**
- Click the puzzle piece icon in the toolbar
- Find "Read-Later Extension" and click the pin icon

**Firefox:**
- Right-click the toolbar and select "Customize Toolbar"
- Drag the extension icon to your toolbar

### "Failed to save page" Error

**Possible causes:**

1. **Web application not running**
   - Make sure the development server is running at `http://localhost:3000`
   - Run `npm run dev` in your project directory

2. **Invalid API token**
   - Generate a new token from the web application
   - Update the token in the extension by clicking "Change Token"

3. **Network issues**
   - Check that you can access `http://localhost:3000` in your browser
   - Verify there are no firewall or antivirus blocking the connection

### "Please set your API token" Message

- The extension doesn't have a valid token stored
- Click the extension icon and enter your API token
- If you don't have a token, generate one from the web application

### Extension Not Loading

**Chrome/Edge:**
- Make sure Developer Mode is enabled
- Check the extension path is correct: `d:\Git\unnamed_tool\extension`
- Look for error messages in the Extensions page

**Firefox:**
- Check the Browser Console (Ctrl+Shift+J) for error messages
- Make sure you selected the `manifest.json` file when loading

### CORS or Network Errors

If you see CORS errors in the browser console:
- The extension is configured to work with `http://localhost:3000`
- If your app runs on a different port, you'll need to update line 95 in `extension/popup.js`
- Change the URL to match your development server

### Manifest Version Issues

The extension uses Manifest V2, which is:
- ✅ Fully supported in Firefox
- ⚠️ Being phased out in Chrome (but still works in developer mode)

If you encounter issues in Chrome, you may need to migrate to Manifest V3 in the future.

---

## Extension Features

- 🔐 **Secure Authentication**: Uses API tokens to securely save pages
- 💾 **Local Storage**: Remembers your API token between sessions
- 🌐 **Cross-Browser**: Works with Chrome, Edge, and Firefox
- ⚡ **Fast**: Saves pages with a single click
- 🎨 **Clean UI**: Simple, intuitive interface

---

## Development Notes

### File Structure

```
extension/
├── manifest.json      # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js          # Extension logic
├── background.js     # Background script
└── icons/
    └── icon-48.png   # Extension icon
```

### API Endpoint

The extension sends POST requests to:
```
POST http://localhost:3000/api/items
Headers:
  Content-Type: application/json
  Authorization: Bearer <your-api-token>
Body:
  { "url": "https://example.com" }
```

### Modifying the Extension

If you make changes to the extension files:

**Chrome/Edge:**
- Go to `chrome://extensions/`
- Click the refresh icon on the Read-Later Extension card

**Firefox:**
- Go to `about:debugging#/runtime/this-firefox`
- Click "Reload" next to the extension

---

## Security Notes

- 🔒 Your API token is stored locally in your browser using the browser's storage API
- 🔒 Tokens are sent over HTTP during development (localhost only)
- ⚠️ For production use, ensure the web application uses HTTPS
- ⚠️ Never share your API token with others
- ⚠️ If you suspect your token is compromised, generate a new one immediately

---

## Support

If you encounter issues not covered in this guide:

1. Check the browser console for error messages (F12 → Console)
2. Check the extension's background page console:
   - Chrome: `chrome://extensions/` → Details → Inspect views: background page
   - Firefox: `about:debugging#/runtime/this-firefox` → Inspect
3. Verify the web application is running and accessible
4. Review the TODO.md file for known issues

---

## Next Steps

- ✅ Install the extension
- ✅ Get your API token
- ✅ Start saving pages
- 📱 Access your saved pages at `http://localhost:3000`
- 🎯 Organize and read your saved content

Happy reading! 📚
