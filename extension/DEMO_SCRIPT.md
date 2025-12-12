# Extension Demo Script

This script can be used to create a demo video or GIF showing how to install and use the Read-Later browser extension.

## 🎬 Video Script (2-3 minutes)

### Scene 1: Introduction (10 seconds)
**Visual:** Title card with logo
**Narration:** "Learn how to install and use the Read-Later browser extension in just a few simple steps."

---

### Scene 2: Start the Web App (15 seconds)
**Visual:** 
- Terminal window
- Type: `npm run dev`
- Show output: "Ready on http://localhost:3000"
- Browser opens to localhost:3000

**Narration:** "First, start your development server by running 'npm run dev' in your project directory."

---

### Scene 3: Sign In (10 seconds)
**Visual:**
- Show login page
- Click "Sign In"
- Show dashboard

**Narration:** "Sign in to your account using Clerk authentication."

---

### Scene 4: Generate API Token (20 seconds)
**Visual:**
- Click "Settings" in navigation
- Show Settings page with API Token section
- Click "Generate Token" button
- Token appears in code box
- Click "Copy" button
- Show "✓ Copied!" confirmation

**Narration:** "Navigate to Settings and generate your API token. Click the Copy button to copy it to your clipboard."

---

### Scene 5: Install Extension - Chrome (25 seconds)
**Visual:**
- Open new tab
- Type `chrome://extensions/`
- Show extensions page
- Toggle "Developer mode" ON (highlight the toggle)
- Click "Load unpacked" button
- File picker opens
- Navigate to `extension` folder
- Click "Select Folder"
- Extension appears in list
- Extension icon appears in toolbar

**Narration:** "Open Chrome extensions, enable Developer mode, click 'Load unpacked', and select the extension folder. The extension icon will appear in your toolbar."

---

### Scene 6: Configure Extension (20 seconds)
**Visual:**
- Click extension icon in toolbar
- Popup opens showing token input
- Paste token into input field
- Click "Save Token" button
- UI switches to main view
- Show "Token saved!" message

**Narration:** "Click the extension icon, paste your API token, and click Save Token. You're now ready to save pages!"

---

### Scene 7: Save a Page (25 seconds)
**Visual:**
- Navigate to an article (e.g., a blog post)
- Show the article briefly
- Click extension icon
- Popup shows "Save current page to your Read-Later list"
- Click "Save Page" button
- Show "Page saved successfully!" message
- Navigate back to localhost:3000
- Show the saved article in the list

**Narration:** "To save any page, simply click the extension icon and click 'Save Page'. The article is instantly added to your Read-Later list."

---

### Scene 8: View Saved Items (15 seconds)
**Visual:**
- Show dashboard with saved items
- Scroll through list
- Click on saved article
- Article opens

**Narration:** "Access all your saved articles from the dashboard. Click any item to read it later."

---

### Scene 9: Closing (10 seconds)
**Visual:**
- Quick montage of:
  - Extension icon
  - Saving a page
  - Viewing saved items
- End card with "Happy Reading! 📚"

**Narration:** "That's it! Start saving articles and build your reading list today."

---

## 📸 Screenshot Checklist

For documentation, capture these key screenshots:

### Chrome Installation
- [ ] Extensions page with Developer mode toggle
- [ ] "Load unpacked" button highlighted
- [ ] File picker showing extension folder
- [ ] Extension loaded successfully
- [ ] Extension icon in toolbar

### Firefox Installation
- [ ] about:debugging page
- [ ] "Load Temporary Add-on" button
- [ ] File picker showing manifest.json
- [ ] Extension loaded successfully

### Extension Usage
- [ ] Extension popup - token entry state
- [ ] Extension popup - main state
- [ ] Extension popup - saving in progress
- [ ] Extension popup - success message
- [ ] Extension popup - error message

### Web App
- [ ] Settings page with API Token section
- [ ] Token generated and displayed
- [ ] Copy button highlighted
- [ ] Dashboard with saved items
- [ ] Individual saved article view

---

## 🎥 GIF Scenarios

Create short, looping GIFs for these common tasks:

### GIF 1: Loading Extension (Chrome)
**Duration:** 5-8 seconds
**Steps:**
1. Show chrome://extensions/
2. Toggle Developer mode ON
3. Click "Load unpacked"
4. Select folder
5. Extension appears
**Loop point:** Back to extensions page

### GIF 2: Generating Token
**Duration:** 5-7 seconds
**Steps:**
1. Show Settings page
2. Click "Generate Token"
3. Token appears
4. Click "Copy"
5. Show "Copied!" message
**Loop point:** Back to Settings page

### GIF 3: Saving a Page
**Duration:** 4-6 seconds
**Steps:**
1. Show article page
2. Click extension icon
3. Click "Save Page"
4. Show success message
**Loop point:** Back to article

### GIF 4: Complete Flow
**Duration:** 15-20 seconds
**Steps:**
1. Generate token
2. Configure extension
3. Save a page
4. View in dashboard
**Loop point:** Back to Settings

---

## 📝 Annotation Ideas

Add these annotations to screenshots/videos:

### For Installation Steps:
- ✅ "Enable this first"
- 👆 "Click here"
- 📁 "Select this folder"
- ⚠️ "Important: Don't skip this step"

### For Token Generation:
- 🔑 "Your unique API token"
- 📋 "Click to copy"
- ⚠️ "Keep this secret!"

### For Saving Pages:
- 💾 "One click to save"
- ✨ "Saved instantly"
- 📚 "Access from dashboard"

---

## 🎨 Visual Style Guide

### Colors
- Primary: `#0070f3` (Blue)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)
- Background: `#ffffff` (White)
- Text: `#000000` (Black)

### Fonts
- Headers: Bold, 18-24px
- Body: Regular, 14-16px
- Code: Monospace, 12-14px

### Animations
- Fade in/out: 200ms
- Slide: 300ms
- Button press: 100ms
- Success checkmark: 400ms

---

## 🔧 Recording Tips

### Software Recommendations
- **Screen Recording:** OBS Studio, ScreenFlow, Camtasia
- **GIF Creation:** ScreenToGif, LICEcap, Gifox
- **Editing:** DaVinci Resolve, Adobe Premiere, iMovie
- **Annotations:** Snagit, Skitch, Annotate

### Recording Settings
- **Resolution:** 1920x1080 (Full HD)
- **Frame Rate:** 30 fps (60 fps for smooth animations)
- **Format:** MP4 (H.264) for video, GIF for short clips
- **Audio:** Clear narration, no background music during instructions

### Best Practices
- ✅ Use a clean browser profile (no other extensions)
- ✅ Clear browser cache/cookies before recording
- ✅ Use a consistent window size
- ✅ Slow down cursor movements
- ✅ Pause briefly on important UI elements
- ✅ Show success messages clearly
- ✅ Use zoom/highlight for small UI elements
- ❌ Don't rush through steps
- ❌ Don't include personal information
- ❌ Don't show real API tokens

---

## 📋 Pre-Recording Checklist

Before recording:
- [ ] Web app is running on localhost:3000
- [ ] Database has sample data
- [ ] Browser is clean (no other extensions visible)
- [ ] Screen resolution is set to 1920x1080
- [ ] Notifications are disabled
- [ ] Desktop is clean (no sensitive files visible)
- [ ] Test run completed successfully
- [ ] Script is ready
- [ ] Recording software is tested

---

## 🎯 Key Messages to Convey

1. **It's Easy:** Installation takes less than 5 minutes
2. **It's Secure:** API tokens keep your data safe
3. **It's Fast:** Save pages with one click
4. **It's Reliable:** Works across Chrome, Edge, and Firefox
5. **It's Useful:** Build your reading list effortlessly

---

## 📤 Export Formats

### For Documentation
- PNG screenshots (1920x1080)
- Annotated screenshots with arrows/highlights
- Short GIFs (max 5MB each)

### For Social Media
- Square video (1080x1080) for Instagram
- Landscape video (1920x1080) for YouTube
- Short clips (15-30s) for Twitter/X
- Vertical video (1080x1920) for TikTok/Reels

### For README
- Compressed GIFs (max 2MB)
- WebP images for better compression
- Thumbnail images (600x400)

---

**Ready to record?** Follow this script and create amazing demo content! 🎬
