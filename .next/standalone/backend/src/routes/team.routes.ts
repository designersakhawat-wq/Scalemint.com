import { Router } from "express";
import { teamController } from "../controllers/team.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from "../validators/team.validator";
import { Role } from "@prisma/client";

const router = Router();

// Public routes
router.get("/", teamController.getAllMembers);
router.get("/:slug", teamController.getMemberBySlug);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validate(createTeamMemberSchema),
  teamController.createMember
);
router.put(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validate(updateTeamMemberSchema),
  teamController.updateMember
);
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  teamController.deleteMember
);

export default router;
