"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
let memoryUsers = [...initialData_1.initialUsers];
class UserService {
    async getAllUsers({ page = 1, limit = 10, search, }) {
        try {
            const skip = (page - 1) * limit;
            const where = search
                ? {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { email: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {};
            const [total, users] = await Promise.all([
                prisma_1.prisma.user.count({ where }),
                prisma_1.prisma.user.findMany({
                    where,
                    skip,
                    take: limit,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        avatar: true,
                        isActive: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    orderBy: { createdAt: "desc" },
                }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            };
        }
        catch {
            let filtered = [...memoryUsers];
            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
            }
            const total = filtered.length;
            const totalPages = Math.ceil(total / limit) || 1;
            const skip = (page - 1) * limit;
            const users = filtered.slice(skip, skip + limit).map((u) => ({
                id: u.id,
                name: u.name,
                email: u.email,
                role: u.role,
                avatar: u.avatar,
                isActive: u.isActive,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt,
            }));
            return {
                users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            };
        }
    }
    async getUserById(id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatar: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (user)
                return user;
        }
        catch {
            // Fallback
        }
        const user = memoryUsers.find((u) => u.id === id);
        if (!user)
            throw appError_1.AppError.notFound("User not found");
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async updateUserRole(id, role) {
        try {
            return await prisma_1.prisma.user.update({
                where: { id },
                data: { role },
                select: { id: true, name: true, email: true, role: true, isActive: true },
            });
        }
        catch {
            const u = memoryUsers.find((user) => user.id === id);
            if (!u)
                throw appError_1.AppError.notFound("User not found");
            u.role = role;
            return { id: u.id, name: u.name, email: u.email, role: u.role, isActive: u.isActive };
        }
    }
    async toggleUserStatus(id, isActive) {
        try {
            return await prisma_1.prisma.user.update({
                where: { id },
                data: { isActive },
                select: { id: true, name: true, email: true, role: true, isActive: true },
            });
        }
        catch {
            const u = memoryUsers.find((user) => user.id === id);
            if (!u)
                throw appError_1.AppError.notFound("User not found");
            u.isActive = isActive;
            return { id: u.id, name: u.name, email: u.email, role: u.role, isActive: u.isActive };
        }
    }
    async deleteUser(id) {
        try {
            return await prisma_1.prisma.user.delete({ where: { id } });
        }
        catch {
            const idx = memoryUsers.findIndex((u) => u.id === id);
            if (idx === -1)
                throw appError_1.AppError.notFound("User not found");
            memoryUsers.splice(idx, 1);
            return { id };
        }
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map