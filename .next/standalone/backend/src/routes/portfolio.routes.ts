import { Router } from "express";
import { portfolioController } from "../controllers/portfolio.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createPortfolioSchema,
  updatePortfolioSchema,
} from "../validators/portfolio.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public routes
router.get("/", portfolioController.getAllProjects);
router.get("/:slug", portfolioController.getProjectBySlug);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createPortfolioSchema),
  portfolioController.createProject
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updatePortfolioSchema),
  portfolioController.updateProject
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  portfolioController.deleteProject
);

export default router;
