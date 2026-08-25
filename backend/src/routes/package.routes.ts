import { Router } from "express";
import { packageController } from "../controllers/package.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createPackageSchema,
  updatePackageSchema,
} from "../validators/package.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public routes
router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createPackageSchema),
  packageController.createPackage
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updatePackageSchema),
  packageController.updatePackage
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  packageController.deletePackage
);

export default router;
