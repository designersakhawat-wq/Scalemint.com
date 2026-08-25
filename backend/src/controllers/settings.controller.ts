import { Request, Response, NextFunction } from "express";
import { settingsService } from "../services/settings.service";
import { ApiResponse } from "../utils/apiResponse";

export class SettingsController {
  getSettings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await settingsService.getSettings();
      return ApiResponse.success(res, settings, "Settings retrieved successfully");
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await settingsService.updateSettings(req.body);
      return ApiResponse.success(res, updated, "Settings updated successfully");
    } catch (error) {
      next(error);
    }
  };
}

export const settingsController = new SettingsController();
