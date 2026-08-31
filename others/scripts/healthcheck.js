const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  path: '/api/health',
  method: 'GET',
  timeout: 4000
};

const req = http.request(options, (res) => {
  console.log(`Health Check Status: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
  process.exit(res.statusCode === 200 ? 0 : 1);
});

req.on('error', (e) => {
  console.error(`Health check failed: ${e.message}`);
  process.exit(1);
});

req.end();
