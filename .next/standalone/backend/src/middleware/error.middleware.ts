import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { ApiResponse } from "../utils/apiResponse";
import { logger } from "../utils/logger";
import { env } from "../config/env";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.stack || err.message);

  // Handle Custom AppError
  if (err instanceof AppError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors);
  }

  // Handle Zod Validation Error
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return ApiResponse.error(res, "Validation failed", 400, formattedErrors);
  }

  // Handle Prisma Specific Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || [];
      return ApiResponse.error(
        res,
        `Duplicate field value: ${target.join(", ")}. Please use another value.`,
        409
      );
    }
    if (err.code === "P2025") {
      return ApiResponse.error(res, "Resource not found or already deleted.", 404);
    }
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return ApiResponse.error(res, "Invalid token. Please authenticate again.", 401);
  }
  if (err.name === "TokenExpiredError") {
    return ApiResponse.error(res, "Your token has expired. Please authenticate again.", 401);
  }

  // Default to 500 Internal Server Error
  const message =
    env.NODE_ENV === "production" ? "Internal server error" : err.message;

  return ApiResponse.error(
    res,
    message,
    500,
    env.NODE_ENV === "development" ? { stack: err.stack } : undefined
  );
}
