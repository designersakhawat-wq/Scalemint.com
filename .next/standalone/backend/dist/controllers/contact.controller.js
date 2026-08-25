"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
const apiResponse_1 = require("../utils/apiResponse");
class ContactController {
    async submitContact(req, res, next) {
        try {
            const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            const userAgent = req.headers["user-agent"];
            const submission = await contact_service_1.contactService.submitContact({
                ...req.body,
                ipAddress,
                userAgent,
            });
            return apiResponse_1.ApiResponse.created(res, submission, "Thank you! Your message has been received and our team will get back to you shortly.");
        }
        catch (error) {
            next(error);
        }
    }
    async getAllSubmissions(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const status = req.query.status;
            const search = req.query.search;
            const { items, meta } = await contact_service_1.contactService.getAllSubmissions({
                page,
                limit,
                status,
                search,
            });
            return apiResponse_1.ApiResponse.success(res, items, "Contact submissions retrieved successfully", 200, meta);
        }
        catch (error) {
            next(error);
        }
    }
    async getSubmissionById(req, res, next) {
        try {
            const submission = await contact_service_1.contactService.getSubmissionById(req.params.id);
            return apiResponse_1.ApiResponse.success(res, submission, "Contact submission retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const { status, notes } = req.body;
            const submission = await contact_service_1.contactService.updateStatus(req.params.id, status, notes);
            return apiResponse_1.ApiResponse.success(res, submission, "Contact status updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteSubmission(req, res, next) {
        try {
            await contact_service_1.contactService.deleteSubmission(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Contact submission deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContactController = ContactController;
exports.contactController = new ContactController();
//# sourceMappingURL=contact.controller.js.map