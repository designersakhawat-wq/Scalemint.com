import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/team.service";
import { ApiResponse } from "../utils/apiResponse";

export class TeamController {
  async getAllMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const all = req.query.all === "true";
      const members = await teamService.getAllMembers(!all);
      return ApiResponse.success(res, members, "Team members retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getMemberBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await teamService.getMemberBySlug(req.params.slug);
      return ApiResponse.success(res, member, "Team member profile retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createMember(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await teamService.createMember(req.body);
      return ApiResponse.created(res, member, "Team member created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateMember(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await teamService.updateMember(req.params.id, req.body);
      return ApiResponse.success(res, member, "Team member updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteMember(req: Request, res: Response, next: NextFunction) {
    try {
      await teamService.deleteMember(req.params.id);
      return ApiResponse.success(res, null, "Team member deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const teamController = new TeamController();
