import { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import { ApiResponse } from "../utils/apiResponse";

export class AdminController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getDashboardStats();
      return ApiResponse.success(res, stats, "Dashboard metrics retrieved");
    } catch (error) {
      next(error);
    }
  }

  async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

      const { logs, meta } = await adminService.getAuditLogs({ page, limit });
      return ApiResponse.success(res, logs, "Audit logs retrieved", 200, meta);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
