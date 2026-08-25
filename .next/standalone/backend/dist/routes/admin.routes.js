"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Protect all admin routes
router.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN));
// Dashboard
router.get("/dashboard", admin_controller_1.adminController.getDashboard);
// Audit logs
router.get("/audit-logs", admin_controller_1.adminController.getAuditLogs);
// User Management
router.get("/users", user_controller_1.userController.getAllUsers);
router.get("/users/:id", user_controller_1.userController.getUserById);
router.patch("/users/:id/role", user_controller_1.userController.updateUserRole);
router.patch("/users/:id/status", user_controller_1.userController.toggleUserStatus);
router.delete("/users/:id", user_controller_1.userController.deleteUser);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map