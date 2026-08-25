import { Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio.service";
import { ApiResponse } from "../utils/apiResponse";

export class PortfolioController {
  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const isFeatured = req.query.featured !== undefined ? req.query.featured === "true" : undefined;

      const projects = await portfolioService.getAllProjects({ category, isFeatured });
      return ApiResponse.success(res, projects, "Portfolio projects retrieved");
    } catch (error) {
      next(error);
    }
  }

  async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await portfolioService.getProjectBySlug(req.params.slug);
      return ApiResponse.success(res, project, "Project details retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await portfolioService.createProject(req.body);
      return ApiResponse.created(res, project, "Project created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await portfolioService.updateProject(req.params.id, req.body);
      return ApiResponse.success(res, project, "Project updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      await portfolioService.deleteProject(req.params.id);
      return ApiResponse.success(res, null, "Project deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const portfolioController = new PortfolioController();
