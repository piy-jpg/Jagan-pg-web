const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const contactHandler = require('./api/contact');
const healthHandler = require('./api/health');
const roomsHandler = require('./api/rooms');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.get('/api/health', healthHandler);
app.post('/api/contact', contactHandler);
app.get('/api/rooms', roomsHandler);

// Clean URL rewrites for local development
app.get('/rooms', (req, res) => res.sendFile(path.join(frontendPath, 'rooms.html')));
app.get('/why-us', (req, res) => res.sendFile(path.join(frontendPath, 'why_us.html')));
app.get('/why_us', (req, res) => res.sendFile(path.join(frontendPath, 'why_us.html')));
app.get('/amenities', (req, res) => res.sendFile(path.join(frontendPath, 'amenities.html')));
app.get('/life', (req, res) => res.sendFile(path.join(frontendPath, 'life-at-pg.html')));
app.get('/life-at-pg', (req, res) => res.sendFile(path.join(frontendPath, 'life-at-pg.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(frontendPath, 'contact.html')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✨ Jagan PG server running on http://localhost:${PORT}`);
    console.log(`📁 Serving frontend from ${frontendPath}`);
  });
}

module.exports = app;
