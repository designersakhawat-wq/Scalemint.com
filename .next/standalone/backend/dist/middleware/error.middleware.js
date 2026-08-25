"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const appError_1 = require("../utils/appError");
const apiResponse_1 = require("../utils/apiResponse");
const logger_1 = require("../utils/logger");
const env_1 = require("../config/env");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
function errorHandler(err, _req, res, _next) {
    logger_1.logger.error(err.stack || err.message);
    // Handle Custom AppError
    if (err instanceof appError_1.AppError) {
        return apiResponse_1.ApiResponse.error(res, err.message, err.statusCode, err.errors);
    }
    // Handle Zod Validation Error
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
        }));
        return apiResponse_1.ApiResponse.error(res, "Validation failed", 400, formattedErrors);
    }
    // Handle Prisma Specific Errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const target = err.meta?.target || [];
            return apiResponse_1.ApiResponse.error(res, `Duplicate field value: ${target.join(", ")}. Please use another value.`, 409);
        }
        if (err.code === "P2025") {
            return apiResponse_1.ApiResponse.error(res, "Resource not found or already deleted.", 404);
        }
    }
    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        return apiResponse_1.ApiResponse.error(res, "Invalid token. Please authenticate again.", 401);
    }
    if (err.name === "TokenExpiredError") {
        return apiResponse_1.ApiResponse.error(res, "Your token has expired. Please authenticate again.", 401);
    }
    // Default to 500 Internal Server Error
    const message = env_1.env.NODE_ENV === "production" ? "Internal server error" : err.message;
    return apiResponse_1.ApiResponse.error(res, message, 500, env_1.env.NODE_ENV === "development" ? { stack: err.stack } : undefined);
}
//# sourceMappingURL=error.middleware.js.map