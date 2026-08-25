"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const rateLimiter_middleware_1 = require("./middleware/rateLimiter.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const appError_1 = require("./utils/appError");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Security HTTP headers
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
// CORS configuration for local and Hostinger production domains
const configuredOrigins = env_1.env.CLIENT_URL.split(",").map((s) => s.trim());
const defaultOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5000"];
const allowedOrigins = Array.from(new Set([...configuredOrigins, ...defaultOrigins]));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || env_1.env.CLIENT_URL === "*" || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));
// Request rate limiting
app.use("/api", rateLimiter_middleware_1.apiLimiter);
// Body parsers
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
// Static files for uploaded media
const uploadsPath = path_1.default.resolve(process.cwd(), env_1.env.UPLOAD_DIR);
app.use("/uploads", express_1.default.static(uploadsPath));
// Root welcome endpoint
app.get(["/", "/api"], (_req, res) => {
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
app.get("/api/health", (_req, res) => {
    return res.status(200).json({
        success: true,
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: "Scaleminte API",
    });
});
// Mount Main API Routes
app.use("/api/v1", routes_1.default);
// 404 Route Handler
app.use((req, _res, next) => {
    next(appError_1.AppError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
});
// Centralized Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map