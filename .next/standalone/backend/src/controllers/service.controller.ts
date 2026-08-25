import { Request, Response, NextFunction } from "express";
import { serviceService } from "../services/service.service";
import { ApiResponse } from "../utils/apiResponse";

export class ServiceController {
  async getAllServices(req: Request, res: Response, next: NextFunction) {
    try {
      const all = req.query.all === "true";
      const services = await serviceService.getAllServices(!all);
      return ApiResponse.success(res, services, "Services retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getServiceBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.getServiceBySlug(req.params.slug);
      return ApiResponse.success(res, service, "Service details retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.createService(req.body);
      return ApiResponse.created(res, service, "Service created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.updateService(req.params.id, req.body);
      return ApiResponse.success(res, service, "Service updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      await serviceService.deleteService(req.params.id);
      return ApiResponse.success(res, null, "Service deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const serviceController = new ServiceController();
