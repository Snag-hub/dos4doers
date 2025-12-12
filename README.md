# Read-Later Application

A modern read-later application with a browser extension for saving articles and webpages.

## Features

- 📚 Save articles and webpages for later reading
- 🔐 Secure authentication with Clerk
- 🔑 API token-based authentication for browser extension
- 🌐 Browser extension for Chrome, Edge, and Firefox
- ⚡ Built with Next.js and modern web technologies

## Getting Started

### 1. Run the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### 2. Install the Browser Extension

The browser extension lets you save any webpage to your Read-Later list with a single click.

#### 📚 Extension Documentation

- **🚀 [Quick Start Guide](./extension/QUICK_START.md)** - Get up and running in 5 minutes
- **📖 [Complete Installation Guide](./EXTENSION_GUIDE.md)** - Detailed setup for Chrome, Edge, and Firefox
- **🔧 [Troubleshooting Guide](./extension/TROUBLESHOOTING.md)** - Fix common issues
- **📋 [Extension Overview](./extension/README.md)** - Full documentation index

#### ⚡ Quick Setup

1. Make sure the dev server is running (`npm run dev`)
2. Load the extension from the `extension/` folder
   - **Chrome/Edge:** `chrome://extensions/` → Enable Developer mode → Load unpacked
   - **Firefox:** `about:debugging` → Load Temporary Add-on
3. Get your API token from `http://localhost:3000/settings`
4. Configure the extension with your token
5. Start saving pages!

**Need help?** Check the [troubleshooting guide](./extension/TROUBLESHOOTING.md) or [complete guide](./EXTENSION_GUIDE.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
