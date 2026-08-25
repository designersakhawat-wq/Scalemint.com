import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/service.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public routes
router.get("/", serviceController.getAllServices);
router.get("/:slug", serviceController.getServiceBySlug);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createServiceSchema),
  serviceController.createService
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updateServiceSchema),
  serviceController.updateService
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  serviceController.deleteService
);

export default router;
