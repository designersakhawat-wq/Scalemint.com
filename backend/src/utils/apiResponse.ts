import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = "Operation successful",
    statusCode: number = 200,
    meta?: PaginationMeta | Record<string, unknown>
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    });
  }

  static created<T>(
    res: Response,
    data: T,
    message: string = "Resource created successfully",
    meta?: PaginationMeta | Record<string, unknown>
  ) {
    return this.success(res, data, message, 201, meta);
  }

  static error(
    res: Response,
    message: string = "Internal server error",
    statusCode: number = 500,
    errors?: unknown
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors ? { errors } : {}),
    });
  }
}
