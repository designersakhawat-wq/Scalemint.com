"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const team_validator_1 = require("../validators/team.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes
router.get("/", team_controller_1.teamController.getAllMembers);
router.get("/:slug", team_controller_1.teamController.getMemberBySlug);
// Admin routes
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(team_validator_1.createTeamMemberSchema), team_controller_1.teamController.createMember);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(team_validator_1.updateTeamMemberSchema), team_controller_1.teamController.updateMember);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), team_controller_1.teamController.deleteMember);
exports.default = router;
//# sourceMappingURL=team.routes.js.map