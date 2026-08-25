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
const standaloneNextStatic = path.join(rootDir, '.next', 'standalone', '.next', 'static');
const standalonePublic = path.join(rootDir, '.next', 'standalone', 'public');
const standaloneData = path.join(rootDir, '.next', 'standalone', 'data');
const dataDir = path.join(rootDir, 'data');
const backendData = path.join(rootDir, 'backend', 'data');

console.log('> Syncing Next.js static assets for production...');

// 1. Clean public/_next if accidentally created to avoid Next.js build errors
const publicNextDir = path.join(rootDir, 'public', '_next');
if (fs.existsSync(publicNextDir)) {
  fs.rmSync(publicNextDir, { recursive: true, force: true });
}

// 2. Copy .next/static to standalone/.next/static
if (fs.existsSync(nextStatic)) {
  copyRecursiveSync(nextStatic, standaloneNextStatic);
  console.log('✓ Synced .next/static -> standalone/.next/static');

  // 3. Create CSS fallback copies in chunk directories so older cached HTML never fails
  const chunkDirs = [
    path.join(rootDir, '.next', 'static', 'chunks'),
    path.join(rootDir, '.next', 'standalone', '.next', 'static', 'chunks'),
  ];

  const legacyCssNames = [
    '2fqlap79qm-ko.css',
    '34d-ngyreyj5y.css',
    '3r6ko_omhd4dg.css',
    '3wg_j6qboei5t.css',
    'main.css',
    'globals.css',
    'style.css'
  ];

  for (const cDir of chunkDirs) {
    if (fs.existsSync(cDir)) {
      const allCss = fs.readdirSync(cDir).filter((f) => f.endsWith('.css'));
      if (allCss.length > 0) {
        const sourceCss = path.join(cDir, allCss[0]);
        for (const legacyName of legacyCssNames) {
          const destCss = path.join(cDir, legacyName);
          if (!fs.existsSync(destCss)) {
            fs.copyFileSync(sourceCss, destCss);
          }
        }
        console.log(`✓ Created legacy CSS fallback aliases in ${path.relative(rootDir, cDir)}`);
      }
    }
  }
}

// 4. Copy public to standalone
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  copyRecursiveSync(publicDir, standalonePublic);
  console.log('✓ Synced public -> standalone/public');
}

// 5. Sync data directories
if (fs.existsSync(dataDir)) {
  copyRecursiveSync(dataDir, standaloneData);
  copyRecursiveSync(dataDir, backendData);
  console.log('✓ Synced data directories across standalone and backend');
}

// 6. Copy server.js & .htaccess & start.cjs to standalone
const filesToSync = ['server.js', '.htaccess', 'start.cjs'];
for (const file of filesToSync) {
  const srcFile = path.join(rootDir, file);
  const destFile = path.join(rootDir, '.next', 'standalone', file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

console.log('> All production assets successfully synchronized!');
