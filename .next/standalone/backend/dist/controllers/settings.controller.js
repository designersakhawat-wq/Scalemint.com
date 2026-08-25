"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsController = exports.SettingsController = void 0;
const settings_service_1 = require("../services/settings.service");
const apiResponse_1 = require("../utils/apiResponse");
class SettingsController {
    getSettings = async (_req, res, next) => {
        try {
            const settings = await settings_service_1.settingsService.getSettings();
            return apiResponse_1.ApiResponse.success(res, settings, "Settings retrieved successfully");
        }
        catch (error) {
            next(error);
        }
    };
    updateSettings = async (req, res, next) => {
        try {
            const updated = await settings_service_1.settingsService.updateSettings(req.body);
            return apiResponse_1.ApiResponse.success(res, updated, "Settings updated successfully");
        }
        catch (error) {
            next(error);
        }
    };
}
exports.SettingsController = SettingsController;
exports.settingsController = new SettingsController();
//# sourceMappingURL=settings.controller.js.map