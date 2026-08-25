import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Protect all admin routes
router.use(authenticate, authorize(Role.ADMIN));

// Dashboard
router.get("/dashboard", adminController.getDashboard);

// Audit logs
router.get("/audit-logs", adminController.getAuditLogs);

// User Management
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.patch("/users/:id/role", userController.updateUserRole);
router.patch("/users/:id/status", userController.toggleUserStatus);
router.delete("/users/:id", userController.deleteUser);

export default router;
