"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("../controllers/service.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const service_validator_1 = require("../validators/service.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes
router.get("/", service_controller_1.serviceController.getAllServices);
router.get("/:slug", service_controller_1.serviceController.getServiceBySlug);
// Admin routes
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(service_validator_1.createServiceSchema), service_controller_1.serviceController.createService);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(service_validator_1.updateServiceSchema), service_controller_1.serviceController.updateService);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), service_controller_1.serviceController.deleteService);
exports.default = router;
//# sourceMappingURL=service.routes.js.map