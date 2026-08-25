"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const apiResponse_1 = require("../utils/apiResponse");
class UserController {
    async getAllUsers(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const search = req.query.search;
            const { users, meta } = await user_service_1.userService.getAllUsers({ page, limit, search });
            return apiResponse_1.ApiResponse.success(res, users, "Users retrieved successfully", 200, meta);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const user = await user_service_1.userService.getUserById(req.params.id);
            return apiResponse_1.ApiResponse.success(res, user, "User retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserRole(req, res, next) {
        try {
            const role = req.body.role;
            const user = await user_service_1.userService.updateUserRole(req.params.id, role);
            return apiResponse_1.ApiResponse.success(res, user, "User role updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async toggleUserStatus(req, res, next) {
        try {
            const isActive = req.body.isActive === true;
            const user = await user_service_1.userService.toggleUserStatus(req.params.id, isActive);
            return apiResponse_1.ApiResponse.success(res, user, "User status updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            await user_service_1.userService.deleteUser(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "User deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map