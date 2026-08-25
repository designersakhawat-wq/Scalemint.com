import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { ApiResponse } from "../utils/apiResponse";
import { Role } from "@prisma/client";

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const search = req.query.search as string | undefined;

      const { users, meta } = await userService.getAllUsers({ page, limit, search });
      return ApiResponse.success(res, users, "Users retrieved successfully", 200, meta);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id);
      return ApiResponse.success(res, user, "User retrieved");
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.body.role as Role;
      const user = await userService.updateUserRole(req.params.id, role);
      return ApiResponse.success(res, user, "User role updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async toggleUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const isActive = req.body.isActive === true;
      const user = await userService.toggleUserStatus(req.params.id, isActive);
      return ApiResponse.success(res, user, "User status updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUser(req.params.id);
      return ApiResponse.success(res, null, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
