import { Router } from "express";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import serviceRoutes from "./service.routes";
import blogRoutes from "./blog.routes";
import portfolioRoutes from "./portfolio.routes";
import packageRoutes from "./package.routes";
import teamRoutes from "./team.routes";
import faqRoutes from "./faq.routes";
import uploadRoutes from "./upload.routes";
import adminRoutes from "./admin.routes";
import settingsRoutes from "./settings.routes";
import invoiceRoutes from "./invoice.routes";

const router = Router();

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

router.use("/auth", authRoutes);
router.use("/settings", settingsRoutes);
router.use("/contact", contactRoutes);
router.use("/services", serviceRoutes);
router.use("/blogs", blogRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/packages", packageRoutes);
router.use("/team", teamRoutes);
router.use("/faqs", faqRoutes);
router.use("/uploads", uploadRoutes);
router.use("/admin", adminRoutes);
router.use("/invoices", invoiceRoutes);

export default router;
