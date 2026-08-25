import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { emailService } from "./email.service";
import { Role } from "@prisma/client";
import { initialUsers } from "../config/initialData";

let memoryUsers: any[] = [...initialUsers];

export class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const email = data.email.toLowerCase();

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw AppError.conflict("An account with this email address already exists.");
      }
    } catch (e: any) {
      if (e instanceof AppError) throw e;
    }

    const existingInMemory = memoryUsers.find((u) => u.email === email);
    if (existingInMemory) {
      throw AppError.conflict("An account with this email address already exists.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    let user: any;

    try {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email,
          passwordHash,
          role: Role.USER,
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
    } catch {
      user = {
        id: `usr_${Date.now()}`,
        name: data.name,
        email,
        passwordHash,
        role: "USER" as Role,
        isActive: true,
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      memoryUsers.push(user);
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
    } catch {
      // Memory fallback
    }

    return { user, accessToken, refreshToken };
  }

  async login(data: { email: string; password: string }) {
    const email = data.email.toLowerCase();
    let user: any;

    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch {
      // Fallback to memory
    }

    if (!user) {
      user = memoryUsers.find((u) => u.email === email);
    }

    if (!user) {
      throw AppError.unauthorized("Invalid email or password.");
    }

    if (!user.isActive) {
      throw AppError.forbidden("Your account has been deactivated. Please contact support.");
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw AppError.unauthorized("Invalid email or password.");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
    } catch {
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

  async refreshToken(oldRefreshToken: string) {
    try {
      const payload = verifyRefreshToken(oldRefreshToken);
      let user: any;

      try {
        user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
      } catch {
        user = memoryUsers.find((u) => u.id === payload.userId);
      }

      if (!user || (user.refreshToken && user.refreshToken !== oldRefreshToken) || !user.isActive) {
        throw AppError.unauthorized("Invalid or expired refresh token.");
      }

      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const newRefreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: newRefreshToken },
        });
      } catch {
        user.refreshToken = newRefreshToken;
      }

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw AppError.unauthorized("Invalid or expired refresh token.");
    }
  }

  async logout(userId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    } catch {
      const u = memoryUsers.find((user) => user.id === userId);
      if (u) u.refreshToken = null as any;
    }
  }

  async forgotPassword(email: string) {
    let user: any;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch {
      user = memoryUsers.find((u) => u.email === email.toLowerCase());
    }

    if (!user) {
      return { message: "If that email exists in our records, a reset link was sent." };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken, passwordResetExpires },
      });
    } catch {
      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = passwordResetExpires;
    }

    await emailService.sendPasswordResetEmail(user.email, resetToken);

    return { message: "If that email exists in our records, a reset link was sent." };
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    let user: any;
    try {
      user = await prisma.user.findFirst({
        where: {
          passwordResetToken: hashedToken,
          passwordResetExpires: { gt: new Date() },
        },
      });
    } catch {
      user = memoryUsers.find(
        (u: any) =>
          u.passwordResetToken === hashedToken &&
          new Date(u.passwordResetExpires).getTime() > Date.now()
      );
    }

    if (!user) {
      throw AppError.badRequest("Password reset token is invalid or has expired.");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          passwordResetToken: null,
          passwordResetExpires: null,
          refreshToken: null,
        },
      });
    } catch {
      user.passwordHash = passwordHash;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
    }

    return { message: "Password has been successfully updated. Please login." };
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    let user: any;
    try {
      user = await prisma.user.findUnique({ where: { id: userId } });
    } catch {
      user = memoryUsers.find((u) => u.id === userId);
    }

    if (!user) throw AppError.notFound("User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw AppError.badRequest("Incorrect current password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
      });
    } catch {
      user.passwordHash = passwordHash;
    }

    return { message: "Password updated successfully" };
  }
}

export const authService = new AuthService();
