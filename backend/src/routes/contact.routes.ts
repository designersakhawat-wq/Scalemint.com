import { Router } from "express";
import { contactController } from "../controllers/contact.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { submissionLimiter } from "../middleware/rateLimiter.middleware";
import {
  createContactSubmissionSchema,
  updateContactStatusSchema,
} from "../validators/contact.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public: Contact form submission
router.post(
  "/",
  submissionLimiter,
  validate(createContactSubmissionSchema),
  contactController.submitContact
);

// Admin: Get all submissions with filters & search
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  contactController.getAllSubmissions
);

// Admin: Get single submission
router.get(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  contactController.getSubmissionById
);

// Admin: Update status / add notes
router.patch(
  "/:id/status",
  authenticate,
  authorize(Role.ADMIN),
  validate(updateContactStatusSchema),
  contactController.updateStatus
);

// Admin: Delete submission
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  contactController.deleteSubmission
);

export default router;
