import { Router } from "express";
import { blogController } from "../controllers/blog.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public routes
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createBlogSchema),
  blogController.createBlog
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updateBlogSchema),
  blogController.updateBlog
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  blogController.deleteBlog
);

export default router;
