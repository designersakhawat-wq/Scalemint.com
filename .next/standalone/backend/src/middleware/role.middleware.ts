import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import { Role } from "@prisma/client";
import { AppError } from "../utils/appError";

export function authorize(...roles: Role[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError.unauthorized("Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        AppError.forbidden("You do not have permission to perform this action.")
      );
    }

    next();
  };
}
