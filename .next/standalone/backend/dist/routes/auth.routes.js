"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rateLimiter_middleware_1 = require("../middleware/rateLimiter.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post("/register", rateLimiter_middleware_1.submissionLimiter, (0, validate_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.authController.register);
router.post("/login", rateLimiter_middleware_1.submissionLimiter, (0, validate_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.authController.login);
router.post("/refresh-token", auth_controller_1.authController.refreshToken);
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.authController.logout);
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.authController.getMe);
router.post("/forgot-password", rateLimiter_middleware_1.submissionLimiter, (0, validate_middleware_1.validate)(auth_validator_1.forgotPasswordSchema), auth_controller_1.authController.forgotPassword);
router.post("/reset-password", rateLimiter_middleware_1.submissionLimiter, (0, validate_middleware_1.validate)(auth_validator_1.resetPasswordSchema), auth_controller_1.authController.resetPassword);
router.patch("/update-password", auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(auth_validator_1.updatePasswordSchema), auth_controller_1.authController.updatePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map