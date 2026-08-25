"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = exports.UploadController = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const appError_1 = require("../utils/appError");
class UploadController {
    async uploadFile(req, res, next) {
        try {
            if (!req.file) {
                throw appError_1.AppError.badRequest("No file uploaded");
            }
            const fileUrl = `/uploads/${req.file.filename}`;
            return apiResponse_1.ApiResponse.created(res, {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                url: fileUrl,
            }, "File uploaded successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UploadController = UploadController;
exports.uploadController = new UploadController();
//# sourceMappingURL=upload.controller.js.map