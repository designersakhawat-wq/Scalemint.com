"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const service_routes_1 = __importDefault(require("./service.routes"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const portfolio_routes_1 = __importDefault(require("./portfolio.routes"));
const package_routes_1 = __importDefault(require("./package.routes"));
const team_routes_1 = __importDefault(require("./team.routes"));
const faq_routes_1 = __importDefault(require("./faq.routes"));
const upload_routes_1 = __importDefault(require("./upload.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const settings_routes_1 = __importDefault(require("./settings.routes"));
const invoice_routes_1 = __importDefault(require("./invoice.routes"));
const router = (0, express_1.Router)();
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: "Scaleminte API v1",
    });
});
router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Scaleminte REST API v1",
        version: "1.0.0",
        healthCheck: "/api/health",
        documentation: {
            auth: {
                login: "POST /api/v1/auth/login",
                register: "POST /api/v1/auth/register",
                me: "GET /api/v1/auth/me",
                refreshToken: "POST /api/v1/auth/refresh-token",
                logout: "POST /api/v1/auth/logout"
            },
            publicEndpoints: {
                settings: "GET /api/v1/settings",
                services: "GET /api/v1/services",
                blogs: "GET /api/v1/blogs",
                portfolio: "GET /api/v1/portfolio",
                packages: "GET /api/v1/packages",
                team: "GET /api/v1/team",
                faqs: "GET /api/v1/faqs",
                contactSubmission: "POST /api/v1/contact"
            },
            adminEndpoints: {
                dashboard: "GET /api/v1/admin/dashboard",
                updateSettings: "PUT /api/v1/settings",
                contactInquiries: "GET /api/v1/contact",
                users: "GET /api/v1/admin/users",
                auditLogs: "GET /api/v1/admin/audit-logs",
                uploads: "POST /api/v1/uploads"
            }
        }
    });
});
router.use("/auth", auth_routes_1.default);
router.use("/settings", settings_routes_1.default);
router.use("/contact", contact_routes_1.default);
router.use("/services", service_routes_1.default);
router.use("/blogs", blog_routes_1.default);
router.use("/portfolio", portfolio_routes_1.default);
router.use("/packages", package_routes_1.default);
router.use("/team", team_routes_1.default);
router.use("/faqs", faq_routes_1.default);
router.use("/uploads", upload_routes_1.default);
router.use("/admin", admin_routes_1.default);
router.use("/invoices", invoice_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map