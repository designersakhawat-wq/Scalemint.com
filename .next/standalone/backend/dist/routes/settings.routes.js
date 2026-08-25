"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const router = (0, express_1.Router)();
// GET /api/v1/settings (Public - used by frontend to fetch theme, logo, contact info)
router.get("/", settings_controller_1.settingsController.getSettings);
// PUT /api/v1/settings (Admin site customizer)
router.put("/", settings_controller_1.settingsController.updateSettings);
exports.default = router;
//# sourceMappingURL=settings.routes.js.map