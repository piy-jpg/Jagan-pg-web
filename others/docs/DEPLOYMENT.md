# Deployment Guide - Jagan PG

## 🌐 Vercel Deployment (Production)
The repository is configured for automated builds via Vercel:
1. Every push to `main` triggers a serverless deployment.
2. `vercel.json` configures clean URL rewrites for `frontend/` pages and routes `/api/*` to serverless function endpoints.
3. Live URL: [https://jagan-pg-web.vercel.app/](https://jagan-pg-web.vercel.app/)

## 💻 Local Node.js Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.
