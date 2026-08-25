"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = exports.AdminService = void 0;
const prisma_1 = require("../config/prisma");
const client_1 = require("@prisma/client");
const initialData_1 = require("../config/initialData");
let memoryAuditLogs = [];
class AdminService {
    async getDashboardStats() {
        try {
            const [totalSubmissions, unreadSubmissions, totalBlogs, totalServices, totalPortfolio, totalPackages, totalTeam, totalUsers, recentContacts, recentBlogs,] = await Promise.all([
                prisma_1.prisma.contactSubmission.count(),
                prisma_1.prisma.contactSubmission.count({ where: { status: client_1.ContactStatus.UNREAD } }),
                prisma_1.prisma.blogPost.count(),
                prisma_1.prisma.service.count(),
                prisma_1.prisma.portfolioProject.count(),
                prisma_1.prisma.pricingPackage.count(),
                prisma_1.prisma.teamMember.count(),
                prisma_1.prisma.user.count(),
                prisma_1.prisma.contactSubmission.findMany({
                    take: 5,
                    orderBy: { createdAt: "desc" },
                }),
                prisma_1.prisma.blogPost.findMany({
                    take: 5,
                    orderBy: { publishedAt: "desc" },
                    select: { id: true, title: true, slug: true, category: true, views: true, publishedAt: true },
                }),
            ]);
            return {
                overview: {
                    totalSubmissions,
                    unreadSubmissions,
                    totalBlogs,
                    totalServices,
                    totalPortfolio,
                    totalPackages,
                    totalTeam,
                    totalUsers,
                },
                recentContacts,
                recentBlogs,
            };
        }
        catch {
            return {
                overview: {
                    totalSubmissions: initialData_1.initialContacts.length,
                    unreadSubmissions: initialData_1.initialContacts.filter((c) => c.status === "UNREAD").length,
                    totalBlogs: initialData_1.initialBlogs.length,
                    totalServices: initialData_1.initialServices.length,
                    totalPortfolio: initialData_1.initialPortfolio.length,
                    totalPackages: initialData_1.initialPackages.length,
                    totalTeam: initialData_1.initialTeam.length,
                    totalUsers: initialData_1.initialUsers.length,
                },
                recentContacts: initialData_1.initialContacts.slice(0, 5),
                recentBlogs: initialData_1.initialBlogs.slice(0, 5),
            };
        }
    }
    async logAction(data) {
        try {
            return await prisma_1.prisma.auditLog.create({
                data: {
                    userId: data.userId,
                    action: data.action,
                    entity: data.entity,
                    entityId: data.entityId,
                    details: data.details,
                    ipAddress: data.ipAddress,
                },
            });
        }
        catch {
            const log = {
                id: `log_${Date.now()}`,
                ...data,
                createdAt: new Date().toISOString(),
            };
            memoryAuditLogs.unshift(log);
            return log;
        }
    }
    async getAuditLogs({ page = 1, limit = 20 }) {
        try {
            const skip = (page - 1) * limit;
            const [total, logs] = await Promise.all([
                prisma_1.prisma.auditLog.count(),
                prisma_1.prisma.auditLog.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: "desc" },
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, role: true },
                        },
                    },
                }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                logs,
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
            const total = memoryAuditLogs.length;
            const totalPages = Math.ceil(total / limit) || 1;
            const skip = (page - 1) * limit;
            const logs = memoryAuditLogs.slice(skip, skip + limit);
            return {
                logs,
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
}
exports.AdminService = AdminService;
exports.adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map