"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const jwt_1 = require("../utils/jwt");
const email_service_1 = require("./email.service");
const client_1 = require("@prisma/client");
const initialData_1 = require("../config/initialData");
let memoryUsers = [...initialData_1.initialUsers];
class AuthService {
    async register(data) {
        const email = data.email.toLowerCase();
        try {
            const existingUser = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw appError_1.AppError.conflict("An account with this email address already exists.");
            }
        }
        catch (e) {
            if (e instanceof appError_1.AppError)
                throw e;
        }
        const existingInMemory = memoryUsers.find((u) => u.email === email);
        if (existingInMemory) {
            throw appError_1.AppError.conflict("An account with this email address already exists.");
        }
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        let user;
        try {
            user = await prisma_1.prisma.user.create({
                data: {
                    name: data.name,
                    email,
                    passwordHash,
                    role: client_1.Role.USER,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true,
                    createdAt: true,
                },
            });
        }
        catch {
            user = {
                id: `usr_${Date.now()}`,
                name: data.name,
                email,
                passwordHash,
                role: "USER",
                isActive: true,
                avatar: null,
                createdAt: new Date().toISOString(),
            };
            memoryUsers.push(user);
        }
        const accessToken = (0, jwt_1.generateAccessToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        try {
            await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken },
            });
        }
        catch {
            // Memory fallback
        }
        return { user, accessToken, refreshToken };
    }
    async login(data) {
        const email = data.email.toLowerCase();
        let user;
        try {
            user = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
        }
        catch {
            // Fallback to memory
        }
        if (!user) {
            user = memoryUsers.find((u) => u.email === email);
        }
        if (!user) {
            throw appError_1.AppError.unauthorized("Invalid email or password.");
        }
        if (!user.isActive) {
            throw appError_1.AppError.forbidden("Your account has been deactivated. Please contact support.");
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw appError_1.AppError.unauthorized("Invalid email or password.");
        }
        const accessToken = (0, jwt_1.generateAccessToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        try {
            await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken },
            });
        }
        catch {
            user.refreshToken = refreshToken;
        }
        const userProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };
        return { user: userProfile, accessToken, refreshToken };
    }
    async refreshToken(oldRefreshToken) {
        try {
            const payload = (0, jwt_1.verifyRefreshToken)(oldRefreshToken);
            let user;
            try {
                user = await prisma_1.prisma.user.findUnique({
                    where: { id: payload.userId },
                });
            }
            catch {
                user = memoryUsers.find((u) => u.id === payload.userId);
            }
            if (!user || (user.refreshToken && user.refreshToken !== oldRefreshToken) || !user.isActive) {
                throw appError_1.AppError.unauthorized("Invalid or expired refresh token.");
            }
            const accessToken = (0, jwt_1.generateAccessToken)({
                userId: user.id,
                email: user.email,
                role: user.role,
            });
            const newRefreshToken = (0, jwt_1.generateRefreshToken)({
                userId: user.id,
                email: user.email,
                role: user.role,
            });
            try {
                await prisma_1.prisma.user.update({
                    where: { id: user.id },
                    data: { refreshToken: newRefreshToken },
                });
            }
            catch {
                user.refreshToken = newRefreshToken;
            }
            return { accessToken, refreshToken: newRefreshToken };
        }
        catch {
            throw appError_1.AppError.unauthorized("Invalid or expired refresh token.");
        }
    }
    async logout(userId) {
        try {
            await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { refreshToken: null },
            });
        }
        catch {
            const u = memoryUsers.find((user) => user.id === userId);
            if (u)
                u.refreshToken = null;
        }
    }
    async forgotPassword(email) {
        let user;
        try {
            user = await prisma_1.prisma.user.findUnique({
                where: { email: email.toLowerCase() },
            });
        }
        catch {
            user = memoryUsers.find((u) => u.email === email.toLowerCase());
        }
        if (!user) {
            return { message: "If that email exists in our records, a reset link was sent." };
        }
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const passwordResetToken = crypto_1.default
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
        try {
            await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: { passwordResetToken, passwordResetExpires },
            });
        }
        catch {
            user.passwordResetToken = passwordResetToken;
            user.passwordResetExpires = passwordResetExpires;
        }
        await email_service_1.emailService.sendPasswordResetEmail(user.email, resetToken);
        return { message: "If that email exists in our records, a reset link was sent." };
    }
    async resetPassword(token, newPassword) {
        const hashedToken = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        let user;
        try {
            user = await prisma_1.prisma.user.findFirst({
                where: {
                    passwordResetToken: hashedToken,
                    passwordResetExpires: { gt: new Date() },
                },
            });
        }
        catch {
            user = memoryUsers.find((u) => u.passwordResetToken === hashedToken &&
                new Date(u.passwordResetExpires).getTime() > Date.now());
        }
        if (!user) {
            throw appError_1.AppError.badRequest("Password reset token is invalid or has expired.");
        }
        const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
        try {
            await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: {
                    passwordHash,
                    passwordResetToken: null,
                    passwordResetExpires: null,
                    refreshToken: null,
                },
            });
        }
        catch {
            user.passwordHash = passwordHash;
            user.passwordResetToken = null;
            user.passwordResetExpires = null;
        }
        return { message: "Password has been successfully updated. Please login." };
    }
    async updatePassword(userId, currentPassword, newPassword) {
        let user;
        try {
            user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
        }
        catch {
            user = memoryUsers.find((u) => u.id === userId);
        }
        if (!user)
            throw appError_1.AppError.notFound("User not found");
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            throw appError_1.AppError.badRequest("Incorrect current password");
        }
        const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
        try {
            await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { passwordHash },
            });
        }
        catch {
            user.passwordHash = passwordHash;
        }
        return { message: "Password updated successfully" };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map