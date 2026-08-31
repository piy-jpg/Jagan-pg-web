# Architecture Overview - Jagan PG Web

```
Jagan-pg-web/
├── frontend/             # All static HTML5 web pages & visual assets
│   ├── index.html        # Main Landing Page with 3D Canvas & Reviews Marquee
│   ├── rooms.html        # Interactive Room Catalog & 360 Tour
│   ├── why_us.html       # 6 Pillars & Live Counting Statistics
│   ├── amenities.html    # Luxury Bento Amenities & Orbiting 3D Ring
│   ├── life-at-pg.html   # Photo Gallery & Community Stories
│   ├── contact.html      # Visit Scheduling & Inquiry Form
│   └── assets/           # Logos and Images
│
├── backend/              # Node.js Express server & REST API
│   ├── server.js         # Express app, clean URL rewrites, static router
│   ├── api/
│   │   ├── contact.js    # Contact & Visit Enquiry Dispatcher
│   │   ├── health.js     # Health check ping
│   │   └── rooms.js      # Dynamic rooms inventory API
│   └── .env.example      # Environment variables template
│
├── database/             # Relational Database SQL Schemas & Seed Data
│   ├── schema.sql        # Tables: rooms, enquiries, residents, reviews
│   ├── seed.sql          # Seed data matching current room plans
│   └── db.js             # Data access adapter
│
├── others/               # Documentation, maintenance scripts & legacy archives
│   ├── docs/             # Technical docs & guides
│   ├── scripts/          # Migration & Healthcheck utilities
│   └── legacy/           # Original archive zip & initial scratch files
│
├── api/                  # Vercel Serverless Function entrypoints
├── server.js             # Root development server launcher
├── package.json          # Root npm scripts & dependencies
└── vercel.json           # Production Vercel deployment routing
```
