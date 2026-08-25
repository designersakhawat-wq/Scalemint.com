"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, data, message = "Operation successful", statusCode = 200, meta) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            ...(meta ? { meta } : {}),
        });
    }
    static created(res, data, message = "Resource created successfully", meta) {
        return this.success(res, data, message, 201, meta);
    }
    static error(res, message = "Internal server error", statusCode = 500, errors) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {}),
        });
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=apiResponse.js.map