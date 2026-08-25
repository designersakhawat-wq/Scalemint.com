const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const OUT_DIR = fs.existsSync(path.join(__dirname, 'out')) 
  ? path.join(__dirname, 'out') 
  : path.join(process.cwd(), 'out');

console.log(`> Initializing Scalemint Server on Port ${PORT}...`);
console.log(`> Serving static files from: ${OUT_DIR}`);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const server = http.createServer((req, res) => {
  try {
    const rawUrl = req.url || '/';
    let cleanPath = rawUrl.split('?')[0].split('#')[0];
    
    // Normalize root path
    if (cleanPath === '/' || cleanPath === '') {
      cleanPath = '/index.html';
    }

    let targetFile = path.join(OUT_DIR, cleanPath);

    // If target has no extension, check if .html file exists or directory/index.html exists
    if (!path.extname(cleanPath)) {
      if (fs.existsSync(targetFile + '.html')) {
        targetFile = targetFile + '.html';
      } else if (fs.existsSync(path.join(targetFile, 'index.html'))) {
        targetFile = path.join(targetFile, 'index.html');
      }
    }

    // Serve file if exists
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
      const ext = path.extname(targetFile).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const isHtml = ext === '.html';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': isHtml ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable',
        'X-Powered-By': 'Scalemint Core',
      });

      return fs.createReadStream(targetFile).pipe(res);
    }

    // Fallback 404
    const notFoundFile = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFoundFile)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(notFoundFile).pipe(res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found - Scalemint');
  } catch (error) {
    console.error('Server error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`> Scalemint Website is LIVE and listening on port ${PORT}!`);
});
