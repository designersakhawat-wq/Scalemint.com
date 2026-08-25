# 🚀 Scaleminte Deployment & GitHub Guide

This project contains a high-performance **Next.js 16 (App Router)** Frontend and a robust **Node.js / Express (TypeScript)** Backend.

---

## 📁 1. Project Architecture

- **Frontend (Next.js)**: Root directory (`/`)
- **Backend (Express + TypeScript + File Storage)**: `/backend`
- **Dynamic Assets**: `/backend/uploads`

---

## 🐙 2. How to Push to GitHub (Git Setup)

All `node_modules`, build artifacts (`.next`, `dist`), and private `.env` files are already configured in `.gitignore`.

In your project terminal, run:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all project files
git add .

# 3. Commit the changes
git commit -m "feat: production ready Scaleminte website and backend"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/scaleminte-website.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🌐 3. Deploying to Hostinger

### Option A: Hostinger Cloud / VPS (Recommended for Fullstack Node.js + Next.js)

1. **Clone repository onto the server**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/scaleminte-website.git
   cd scaleminte-website
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your domain & port
   npm run build
   # Run with PM2 for 24/7 uptime:
   pm2 start dist/server.js --name "scaleminte-backend"
   ```

3. **Setup Frontend**:
   ```bash
   cd ..
   npm install
   cp .env.example .env.local
   # In .env.local, set NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1 (or your backend URL)
   npm run build
   pm2 start npm --name "scaleminte-frontend" -- start
   ```

4. **Nginx Reverse Proxy Configuration (Example)**:
   ```nginx
   # Frontend
   location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }

   # Backend API
   location /api/ {
       proxy_pass http://localhost:5000/api/;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }

   # Uploads
   location /uploads/ {
       proxy_pass http://localhost:5000/uploads/;
   }
   ```

---

### Option B: Hostinger hPanel Node.js Web App

1. In Hostinger hPanel, create a Node.js Application for the backend:
   - **Application Root**: `backend`
   - **Startup File**: `dist/server.js`
   - **Node.js Version**: 18.x or 20.x
2. Run `npm install && npm run build` in the backend.
3. Deploy frontend either via Vercel (recommended for Next.js - 1-click deploy with repository) or as a Node.js app on Hostinger.

---

## 🔑 Default Admin Credentials
- **Admin Studio URL**: `http://yourdomain.com/admin`
- **Email**: `admin@scaleminte.com`
- **Password**: `Admin@123456`
