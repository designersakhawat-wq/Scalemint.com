"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const apiResponse_1 = require("../utils/apiResponse");
class AdminController {
    async getDashboard(req, res, next) {
        try {
            const stats = await admin_service_1.adminService.getDashboardStats();
            return apiResponse_1.ApiResponse.success(res, stats, "Dashboard metrics retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async getAuditLogs(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
            const { logs, meta } = await admin_service_1.adminService.getAuditLogs({ page, limit });
            return apiResponse_1.ApiResponse.success(res, logs, "Audit logs retrieved", 200, meta);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
//# sourceMappingURL=admin.controller.js.map