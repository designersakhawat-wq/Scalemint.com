"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const rateLimiter_middleware_1 = require("../middleware/rateLimiter.middleware");
const contact_validator_1 = require("../validators/contact.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public: Contact form submission
router.post("/", rateLimiter_middleware_1.submissionLimiter, (0, validate_middleware_1.validate)(contact_validator_1.createContactSubmissionSchema), contact_controller_1.contactController.submitContact);
// Admin: Get all submissions with filters & search
router.get("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), contact_controller_1.contactController.getAllSubmissions);
// Admin: Get single submission
router.get("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), contact_controller_1.contactController.getSubmissionById);
// Admin: Update status / add notes
router.patch("/:id/status", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(contact_validator_1.updateContactStatusSchema), contact_controller_1.contactController.updateStatus);
// Admin: Delete submission
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), contact_controller_1.contactController.deleteSubmission);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map