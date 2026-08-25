# Scaleminte Backend API

Production-ready, enterprise-grade backend architecture for Scaleminte Creative Support Agency.

## Tech Stack
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma ORM
- **Authentication:** JWT (Access & Refresh Tokens) + bcryptjs
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting, Centralized Error Handling
- **Testing:** Jest + Supertest
- **Uploads:** Multer with MIME & Size restrictions
- **Email:** Nodemailer (SMTP with fallback)

---

## Getting Started

### 1. Installation
Navigate to the `backend/` directory and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` in `.env` points to your PostgreSQL database:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/scaleminte_db?schema=public"
```

### 3. Database Migration & Seeding
Generate Prisma Client:
```bash
npx prisma generate
```
Push the schema to your database:
```bash
npx prisma db push
```
Seed initial services, blogs, portfolio projects, packages, team profiles, FAQs, and default admin:
```bash
npm run prisma:seed
```

### 4. Running Locally
Start in development mode with hot-reloading:
```bash
npm run dev
```
The server will start at: `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`
- **API Base:** `http://localhost:5000/api/v1`

---

## Seed Accounts
- **Admin User:** `admin@scaleminte.com` | Password: `Admin@123456`
- **Demo User:** `user@scaleminte.com` | Password: `User@123456`

---

## API Endpoints Summary

### Authentication (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - User/Admin login
- `POST /refresh-token` - Refresh access token
- `POST /logout` - Invalidate session
- `GET /me` - Get authenticated profile
- `POST /forgot-password` - Request password reset link
- `POST /reset-password` - Reset password with token
- `PATCH /update-password` - Change password

### Contact & Leads (`/api/v1/contact`)
- `POST /` - Public contact form submission (rate-limited)
- `GET /` - (Admin) List inquiries with status, search, and pagination
- `GET /:id` - (Admin) View single inquiry
- `PATCH /:id/status` - (Admin) Update inquiry status (`UNREAD`, `READ`, `IN_PROGRESS`, `REPLIED`, `ARCHIVED`)
- `DELETE /:id` - (Admin) Delete submission

### Public Services & Dynamic Content
- `GET /api/v1/services` - List all active agency services
- `GET /api/v1/services/:slug` - Get single service details
- `GET /api/v1/blogs` - List blog articles (with search, category filter, pagination)
- `GET /api/v1/blogs/:slug` - Get single blog post (increments view counter)
- `GET /api/v1/portfolio` - List portfolio items (supports `?category=...&featured=true`)
- `GET /api/v1/packages` - List all pricing packages
- `GET /api/v1/team` - List all team members
- `GET /api/v1/team/:slug` - Get single team member profile
- `GET /api/v1/faqs` - List active FAQs

### Admin Management (`/api/v1/admin`) (Protected: `ADMIN` role)
- `GET /dashboard` - Overview metrics, recent submissions, recent blogs
- `GET /audit-logs` - System audit trail
- `GET /users` - List users
- `PATCH /users/:id/role` - Change user role (`USER`, `ADMIN`)
- `PATCH /users/:id/status` - Toggle user active status
- `DELETE /users/:id` - Delete user
- **Full CRUD** on `/api/v1/admin/services`, `/api/v1/admin/blogs`, `/api/v1/admin/portfolio`, `/api/v1/admin/packages`, `/api/v1/admin/team`, `/api/v1/admin/faqs`.

### Media Upload (`/api/v1/uploads`) (Protected: `ADMIN` role)
- `POST /` - Multipart file upload (images/PDFs, max 5MB)

---

## Testing
Run automated tests with Jest and Supertest:
```bash
npm test
```

## Production Build
Compile TypeScript to JavaScript:
```bash
npm run build
npm start
```
