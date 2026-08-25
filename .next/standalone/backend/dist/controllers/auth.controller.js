"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const apiResponse_1 = require("../utils/apiResponse");
const env_1 = require("../config/env");
class AuthController {
    async register(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await auth_service_1.authService.register(req.body);
            // Set httpOnly cookie for refresh token
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            return apiResponse_1.ApiResponse.created(res, { user, accessToken }, "Registration successful");
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await auth_service_1.authService.login(req.body);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return apiResponse_1.ApiResponse.success(res, { user, accessToken }, "Login successful");
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
            const result = await auth_service_1.authService.refreshToken(refreshToken);
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return apiResponse_1.ApiResponse.success(res, { accessToken: result.accessToken }, "Token refreshed successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            if (req.user) {
                await auth_service_1.authService.logout(req.user.id);
            }
            res.clearCookie("refreshToken");
            return apiResponse_1.ApiResponse.success(res, null, "Logged out successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            return apiResponse_1.ApiResponse.success(res, req.user, "User profile retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const result = await auth_service_1.authService.forgotPassword(req.body.email);
            return apiResponse_1.ApiResponse.success(res, result, "Password reset instructions sent");
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const result = await auth_service_1.authService.resetPassword(req.body.token, req.body.newPassword);
            return apiResponse_1.ApiResponse.success(res, result, "Password reset successful");
        }
        catch (error) {
            next(error);
        }
    }
    async updatePassword(req, res, next) {
        try {
            const result = await auth_service_1.authService.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
            return apiResponse_1.ApiResponse.success(res, result, "Password updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map