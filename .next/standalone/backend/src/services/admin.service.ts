import { prisma } from "../config/prisma";
import { ContactStatus, Prisma } from "@prisma/client";
import {
  initialContacts,
  initialBlogs,
  initialServices,
  initialPortfolio,
  initialPackages,
  initialTeam,
  initialUsers,
} from "../config/initialData";

let memoryAuditLogs: any[] = [];

export class AdminService {
  async getDashboardStats() {
    try {
      const [
        totalSubmissions,
        unreadSubmissions,
        totalBlogs,
        totalServices,
        totalPortfolio,
        totalPackages,
        totalTeam,
        totalUsers,
        recentContacts,
        recentBlogs,
      ] = await Promise.all([
        prisma.contactSubmission.count(),
        prisma.contactSubmission.count({ where: { status: ContactStatus.UNREAD } }),
        prisma.blogPost.count(),
        prisma.service.count(),
        prisma.portfolioProject.count(),
        prisma.pricingPackage.count(),
        prisma.teamMember.count(),
        prisma.user.count(),
        prisma.contactSubmission.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
        prisma.blogPost.findMany({
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
    } catch {
      return {
        overview: {
          totalSubmissions: initialContacts.length,
          unreadSubmissions: initialContacts.filter((c) => c.status === "UNREAD").length,
          totalBlogs: initialBlogs.length,
          totalServices: initialServices.length,
          totalPortfolio: initialPortfolio.length,
          totalPackages: initialPackages.length,
          totalTeam: initialTeam.length,
          totalUsers: initialUsers.length,
        },
        recentContacts: initialContacts.slice(0, 5),
        recentBlogs: initialBlogs.slice(0, 5),
      };
    }
  }

  async logAction(data: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: Prisma.InputJsonValue;
    ipAddress?: string;
  }) {
    try {
      return await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          details: data.details,
          ipAddress: data.ipAddress,
        },
      });
    } catch {
      const log = {
        id: `log_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      memoryAuditLogs.unshift(log);
      return log;
    }
  }

  async getAuditLogs({ page = 1, limit = 20 }: { page?: number; limit?: number }) {
    try {
      const skip = (page - 1) * limit;

      const [total, logs] = await Promise.all([
        prisma.auditLog.count(),
        prisma.auditLog.findMany({
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
    } catch {
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

export const adminService = new AdminService();
