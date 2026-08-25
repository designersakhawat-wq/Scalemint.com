const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    for (const child of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    }
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

const rootDir = __dirname;
const nextStatic = path.join(rootDir, '.next', 'static');
const publicNextStatic = path.join(rootDir, 'public', '_next', 'static');
const standaloneNextStatic = path.join(rootDir, '.next', 'standalone', '.next', 'static');
const standalonePublic = path.join(rootDir, '.next', 'standalone', 'public');
const standaloneData = path.join(rootDir, '.next', 'standalone', 'data');
const dataDir = path.join(rootDir, 'data');
const backendData = path.join(rootDir, 'backend', 'data');

console.log('> Syncing Next.js static assets for Hostinger web server...');

// 1. Copy .next/static to public/_next/static (for OpenLiteSpeed / Nginx direct serving)
if (fs.existsSync(nextStatic)) {
  copyRecursiveSync(nextStatic, publicNextStatic);
  copyRecursiveSync(nextStatic, standaloneNextStatic);
  console.log('✓ Synced .next/static -> public/_next/static and standalone');
}

// 2. Copy public to standalone
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  copyRecursiveSync(publicDir, standalonePublic);
  console.log('✓ Synced public -> standalone/public');
}

// 3. Sync data directories
if (fs.existsSync(dataDir)) {
  copyRecursiveSync(dataDir, standaloneData);
  copyRecursiveSync(dataDir, backendData);
  console.log('✓ Synced data directories across standalone and backend');
}

console.log('> All production assets successfully synchronized!');
