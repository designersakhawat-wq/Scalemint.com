import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { submissionLimiter } from "../middleware/rateLimiter.middleware";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from "../validators/auth.validator";

const router = Router();

router.post("/register", submissionLimiter, validate(registerSchema), authController.register);
router.post("/login", submissionLimiter, validate(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);
router.post("/forgot-password", submissionLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", submissionLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.patch("/update-password", authenticate, validate(updatePasswordSchema), authController.updatePassword);

export default router;
