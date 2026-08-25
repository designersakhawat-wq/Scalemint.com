import { Request, Response, NextFunction } from "express";
import { packageService } from "../services/package.service";
import { ApiResponse } from "../utils/apiResponse";

export class PackageController {
  async getAllPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const all = req.query.all === "true";
      const packages = await packageService.getAllPackages(!all);
      return ApiResponse.success(res, packages, "Packages retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getPackageById(req: Request, res: Response, next: NextFunction) {
    try {
      const pkg = await packageService.getPackageById(req.params.id);
      return ApiResponse.success(res, pkg, "Package retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const pkg = await packageService.createPackage(req.body);
      return ApiResponse.created(res, pkg, "Package created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updatePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const pkg = await packageService.updatePackage(req.params.id, req.body);
      return ApiResponse.success(res, pkg, "Package updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deletePackage(req: Request, res: Response, next: NextFunction) {
    try {
      await packageService.deletePackage(req.params.id);
      return ApiResponse.success(res, null, "Package deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const packageController = new PackageController();
