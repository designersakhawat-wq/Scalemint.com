"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const package_controller_1 = require("../controllers/package.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const package_validator_1 = require("../validators/package.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes
router.get("/", package_controller_1.packageController.getAllPackages);
router.get("/:id", package_controller_1.packageController.getPackageById);
// Admin routes
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(package_validator_1.createPackageSchema), package_controller_1.packageController.createPackage);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(package_validator_1.updatePackageSchema), package_controller_1.packageController.updatePackage);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), package_controller_1.packageController.deletePackage);
exports.default = router;
//# sourceMappingURL=package.routes.js.map