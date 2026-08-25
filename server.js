const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
process.env.HOSTNAME = '0.0.0.0';
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  console.log(`> Scalemint: Launching Standalone Server on ${process.env.HOSTNAME}:${process.env.PORT} [build: 2026-08-26T00:12]`);
  require(standaloneServer);
} else {
  console.log(`> Scalemint: Standalone not found, executing next start on ${process.env.PORT}`);
  const { createServer } = require('http');
  const next = require('next');
  const app = next({ dev: false, hostname: '0.0.0.0', port: parseInt(process.env.PORT, 10) });
  const handle = app.getRequestHandler();
  app.prepare().then(() => {
    createServer((req, res) => handle(req, res)).listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`> Scalemint server active on port ${process.env.PORT}`);
    });
  });
}
