"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    errors;
    constructor(statusCode, message, errors, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message = "Bad request", errors) {
        return new AppError(400, message, errors);
    }
    static unauthorized(message = "Unauthorized access") {
        return new AppError(401, message);
    }
    static forbidden(message = "Forbidden resource") {
        return new AppError(403, message);
    }
    static notFound(message = "Resource not found") {
        return new AppError(404, message);
    }
    static conflict(message = "Resource already exists") {
        return new AppError(409, message);
    }
    static internal(message = "Internal server error") {
        return new AppError(500, message);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map