# Jagan PG - Backend

Modular Express.js backend for Jagan PG, supporting REST APIs, visit enquiry handling, email/WhatsApp notifications, and static asset delivery.

## 📁 Endpoints
- `GET /api/health` — System status & uptime ping
- `GET /api/rooms` — Dynamic inventory of available PG room configurations & pricing
- `POST /api/contact` — Receives visit/booking enquiries and dispatches automated notifications

## 🚀 Running Locally
```bash
npm run backend
# or
node backend/server.js
```
