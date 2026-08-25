import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { ApiResponse } from "../utils/apiResponse";
import { AuthenticatedRequest } from "../types";
import { env } from "../config/env";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.register(req.body);

      // Set httpOnly cookie for refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return ApiResponse.created(
        res,
        { user, accessToken },
        "Registration successful"
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.login(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return ApiResponse.success(
        res,
        { user, accessToken },
        "Login successful"
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      const result = await authService.refreshToken(refreshToken);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return ApiResponse.success(res, { accessToken: result.accessToken }, "Token refreshed successfully");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (req.user) {
        await authService.logout(req.user.id);
      }
      res.clearCookie("refreshToken");
      return ApiResponse.success(res, null, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      return ApiResponse.success(res, req.user, "User profile retrieved");
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.forgotPassword(req.body.email);
      return ApiResponse.success(res, result, "Password reset instructions sent");
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.resetPassword(req.body.token, req.body.newPassword);
      return ApiResponse.success(res, result, "Password reset successful");
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await authService.updatePassword(
        req.user!.id,
        req.body.currentPassword,
        req.body.newPassword
      );
      return ApiResponse.success(res, result, "Password updated successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
