import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { Role } from "@prisma/client";
import { initialUsers } from "../config/initialData";

let memoryUsers = [...initialUsers];

export class UserService {
  async getAllUsers({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    try {
      const skip = (page - 1) * limit;

      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {};

      const [total, users] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({
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
    } catch {
      let filtered = [...memoryUsers];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
        );
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const skip = (page - 1) * limit;
      const users = filtered.slice(skip, skip + limit).map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as Role,
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

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
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
      if (user) return user;
    } catch {
      // Fallback
    }

    const user = memoryUsers.find((u) => u.id === id);
    if (!user) throw AppError.notFound("User not found");
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      avatar: user.avatar,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateUserRole(id: string, role: Role) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, name: true, email: true, role: true, isActive: true },
      });
    } catch {
      const u = memoryUsers.find((user) => user.id === id);
      if (!u) throw AppError.notFound("User not found");
      u.role = role as any;
      return { id: u.id, name: u.name, email: u.email, role: u.role as Role, isActive: u.isActive };
    }
  }

  async toggleUserStatus(id: string, isActive: boolean) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { isActive },
        select: { id: true, name: true, email: true, role: true, isActive: true },
      });
    } catch {
      const u = memoryUsers.find((user) => user.id === id);
      if (!u) throw AppError.notFound("User not found");
      u.isActive = isActive;
      return { id: u.id, name: u.name, email: u.email, role: u.role as Role, isActive: u.isActive };
    }
  }

  async deleteUser(id: string) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch {
      const idx = memoryUsers.findIndex((u) => u.id === id);
      if (idx === -1) throw AppError.notFound("User not found");
      memoryUsers.splice(idx, 1);
      return { id };
    }
  }
}

export const userService = new UserService();
