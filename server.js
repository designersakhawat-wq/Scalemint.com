const path = require('path');
const fs = require('fs');
const { createServer } = require('http');

process.env.NODE_ENV = 'production';
process.env.HOSTNAME = '0.0.0.0';
if (!process.env.PORT) {
  process.env.PORT = '3000';
}
const PORT = parseInt(process.env.PORT, 10);

// MIME type map for static assets
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
};

function serveStaticFile(req, res) {
  try {
    const rawUrl = req.url || '';
    const url = rawUrl.split('?')[0];

    // 1. Static chunks & media: /_next/static/...
    if (url.startsWith('/_next/static/')) {
      const subPath = url.replace('/_next/static/', '');
      const candidates = [
        path.join(__dirname, '.next', 'static', subPath),
        path.join(__dirname, '.next', 'standalone', '.next', 'static', subPath),
        path.join(__dirname, 'public', '_next', 'static', subPath),
      ];

      for (const p of candidates) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          const ext = path.extname(p).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(p).pipe(res);
          return true;
        }
      }

      // CSS Fallback: If ANY specific CSS chunk was requested but not found (e.g. from cached HTML or CDN),
      // serve the active CSS file from chunks directory so styling NEVER breaks!
      if (url.endsWith('.css')) {
        const chunkDirs = [
          path.join(__dirname, '.next', 'static', 'chunks'),
          path.join(__dirname, '.next', 'standalone', '.next', 'static', 'chunks'),
        ];
        for (const cDir of chunkDirs) {
          if (fs.existsSync(cDir)) {
            const cssFiles = fs.readdirSync(cDir).filter((f) => f.endsWith('.css'));
            if (cssFiles.length > 0) {
              const fallbackCss = path.join(cDir, cssFiles[0]);
              res.writeHead(200, {
                'Content-Type': 'text/css; charset=utf-8',
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
              });
              fs.createReadStream(fallbackCss).pipe(res);
              return true;
            }
          }
        }
      }
    }

    // 2. Uploads: /uploads/...
    if (url.startsWith('/uploads/')) {
      const subPath = url.replace('/uploads/', '');
      const candidates = [
        path.join(__dirname, 'public', 'uploads', subPath),
        path.join(__dirname, '.next', 'standalone', 'public', 'uploads', subPath),
      ];
      for (const p of candidates) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          const ext = path.extname(p).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'image/jpeg';
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(p).pipe(res);
          return true;
        }
      }
    }

    // 3. Public assets: /images/..., /favicon.ico, /logo.png, etc.
    if (url.startsWith('/images/') || url === '/favicon.ico' || url.startsWith('/public/')) {
      const subPath = url.startsWith('/public/') ? url.replace('/public/', '') : url.replace(/^\//, '');
      const candidates = [
        path.join(__dirname, 'public', subPath),
        path.join(__dirname, '.next', 'standalone', 'public', subPath),
      ];
      for (const p of candidates) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          const ext = path.extname(p).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(p).pipe(res);
          return true;
        }
      }
    }
  } catch (err) {
    console.error('Static serving error:', err);
  }

  return false;
}

// Try Next.js programmatic server first
try {
  const next = require('next');
  const app = next({ dev: false, hostname: '0.0.0.0', port: PORT, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = createServer((req, res) => {
      // Direct static serving fast path
      if (serveStaticFile(req, res)) {
        return;
      }

      // Ensure anti-cache headers for dynamic HTML pages
      const originalSetHeader = res.setHeader.bind(res);
      res.setHeader = function(name, value) {
        if (typeof name === 'string' && name.toLowerCase() === 'cache-control') {
          const rawUrl = req.url || '';
          if (!rawUrl.startsWith('/_next/static/') && !rawUrl.startsWith('/images/')) {
            return originalSetHeader('Cache-Control', 'public, max-age=0, must-revalidate, s-maxage=0');
          }
        }
        return originalSetHeader(name, value);
      };

      handle(req, res);
    });

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`> Scaleminte Server running with Direct Static Engine on port ${PORT}`);
    });
  }).catch((err) => {
    console.log('> Next prepare error, falling back to standalone server:', err.message);
    launchStandaloneFallback();
  });
} catch (e) {
  launchStandaloneFallback();
}

function launchStandaloneFallback() {
  const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');
  if (fs.existsSync(standaloneServer)) {
    console.log(`> Scalemint: Launching Standalone Server on ${process.env.HOSTNAME}:${PORT}`);
    require(standaloneServer);
  }
}

