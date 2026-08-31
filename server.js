const path = require('path');
const app = require('./backend/server.js');
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✨ Jagan PG server running on http://localhost:${PORT}`);
    console.log(`📁 Serving frontend from ${path.join(__dirname, 'frontend')}`);
  });
}

module.exports = app;
