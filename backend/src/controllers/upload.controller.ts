import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/appError";

export class UploadController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw AppError.badRequest("No file uploaded");
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      return ApiResponse.created(
        res,
        {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          url: fileUrl,
        },
        "File uploaded successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

export const uploadController = new UploadController();
