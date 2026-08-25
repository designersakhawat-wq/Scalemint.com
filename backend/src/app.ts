import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { env } from "./config/env";
import { apiLimiter } from "./middleware/rateLimiter.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { AppError } from "./utils/appError";
import apiRoutes from "./routes";

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS configuration for local and Hostinger production domains
const configuredOrigins = env.CLIENT_URL.split(",").map((s) => s.trim());
const defaultOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5000"];
const allowedOrigins = Array.from(new Set([...configuredOrigins, ...defaultOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.CLIENT_URL === "*" || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Request rate limiting
app.use("/api", apiLimiter);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Static files for uploaded media
const uploadsPath = path.resolve(process.cwd(), env.UPLOAD_DIR);
app.use("/uploads", express.static(uploadsPath));

// Root welcome endpoint
app.get(["/", "/api"], (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Scaleminte Backend API Server is Live and Operational",
    status: "healthy",
    apiBase: "/api/v1",
    healthCheck: "/api/health",
    endpoints: {
      services: "/api/v1/services",
      blogs: "/api/v1/blogs",
      portfolio: "/api/v1/portfolio",
      packages: "/api/v1/packages",
      team: "/api/v1/team",
      faqs: "/api/v1/faqs",
      contact: "/api/v1/contact",
      authLogin: "/api/v1/auth/login",
      adminDashboard: "/api/v1/admin/dashboard"
    }
  });
});
app.get("/api/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "Scaleminte API",
  });
});

// Mount Main API Routes
app.use("/api/v1", apiRoutes);

// 404 Route Handler
app.use((req: Request, _res: Response, next: NextFunction) => {
  next(AppError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
});

// Centralized Global Error Handler
app.use(errorHandler);

export default app;
