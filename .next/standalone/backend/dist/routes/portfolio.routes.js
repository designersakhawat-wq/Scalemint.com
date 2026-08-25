"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const portfolio_validator_1 = require("../validators/portfolio.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes
router.get("/", portfolio_controller_1.portfolioController.getAllProjects);
router.get("/:slug", portfolio_controller_1.portfolioController.getProjectBySlug);
// Admin routes
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(portfolio_validator_1.createPortfolioSchema), portfolio_controller_1.portfolioController.createProject);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(portfolio_validator_1.updatePortfolioSchema), portfolio_controller_1.portfolioController.updateProject);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), portfolio_controller_1.portfolioController.deleteProject);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map