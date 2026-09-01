# 🏠 Jagan PG – Premium Living Spaces

> Ultra-luxurious, modern paying guest accommodation for students and working professionals near metro with homely food, high-speed WiFi, and 24/7 security.

🔗 **Live Production URL**: **[https://jagan-pg-web.vercel.app/](https://jagan-pg-web.vercel.app/)**

---

## 📁 Repository Structure

```
Jagan-pg-web/
├── frontend/               # User-facing static pages, WebGL 3D canvases & UI
│   ├── index.html          # Main landing page with 3D bloom, reviews marquee & stats
│   ├── rooms.html          # Accommodations catalog with filter tabs & 360 tour modal
│   ├── why_us.html         # 6 core pillars, counting stats & inclusion matrix
│   ├── amenities.html      # Luxury facilities grid with 3D orbital rings canvas
│   ├── life-at-pg.html     # Staggered photo gallery & verified resident stories
│   ├── contact.html        # Booking enquiry form, map directions & WhatsApp concierge
│   └── assets/             # Brand logo and visual assets
│
├── backend/                # Modular Express.js backend & API routes
│   ├── server.js           # Server entry point with clean routing & static file serving
│   ├── api/
│   │   ├── contact.js      # Contact & visit enquiry dispatcher (Email + WhatsApp)
│   │   ├── health.js       # Health check uptime ping
│   │   └── rooms.js        # Dynamic room inventory and pricing endpoint
│   └── .env.example        # Environment variable template
│
├── database/               # Relational SQL schemas & seed migrations
│   ├── schema.sql          # SQL tables: rooms, enquiries, residents, reviews
│   ├── seed.sql            # Seed dataset matching Single, Double, Triple, Quadruple plans
│   └── db.js               # Database abstraction client
│
├── others/                 # Technical documentation, scripts & legacy archives
│   ├── docs/
│   │   ├── ARCHITECTURE.md # Full architecture diagrams & request flows
│   │   └── DEPLOYMENT.md   # Local development and Vercel cloud deployment guide
│   ├── scripts/
│   │   └── healthcheck.js  # Automated endpoint verification script
│   └── legacy/             # Archived original scratch files and zip
│
├── api/                    # Vercel serverless function entrypoints
├── server.js               # Root launcher delegating to backend/server.js
├── package.json            # Project dependencies and npm scripts
└── vercel.json             # Vercel deployment rewrite rules
```

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### 2. Installation
```bash
git clone https://github.com/piy-jpg/Jagan-pg-web.git
cd Jagan-pg-web
npm install
```

### 3. Start Local Server
```bash
npm start
```
Then visit **[http://localhost:3000](http://localhost:3000)**.

### Booking enquiry email setup

Copy `backend/.env.example` to a private `.env` file in the project root and enter the SMTP credentials for the email account that will send enquiries. Set `TO_EMAIL` to the inbox that should receive them. For Gmail, use an App Password rather than your normal account password.

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System status ping |
| `GET` | `/api/rooms` | Available room configurations & pricing |
| `POST` | `/api/contact` | Submit booking enquiry / visit request |

---

## 📜 License
&copy; 2024 Jagan PG. All rights reserved.
