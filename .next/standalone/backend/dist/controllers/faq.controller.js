"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqController = exports.FaqController = void 0;
const faq_service_1 = require("../services/faq.service");
const apiResponse_1 = require("../utils/apiResponse");
class FaqController {
    async getAllFaqs(req, res, next) {
        try {
            const category = req.query.category;
            const all = req.query.all === "true";
            const faqs = await faq_service_1.faqService.getAllFaqs(category, !all);
            return apiResponse_1.ApiResponse.success(res, faqs, "FAQs retrieved successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async getFaqById(req, res, next) {
        try {
            const faq = await faq_service_1.faqService.getFaqById(req.params.id);
            return apiResponse_1.ApiResponse.success(res, faq, "FAQ retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createFaq(req, res, next) {
        try {
            const faq = await faq_service_1.faqService.createFaq(req.body);
            return apiResponse_1.ApiResponse.created(res, faq, "FAQ created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updateFaq(req, res, next) {
        try {
            const faq = await faq_service_1.faqService.updateFaq(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, faq, "FAQ updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteFaq(req, res, next) {
        try {
            await faq_service_1.faqService.deleteFaq(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "FAQ deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.FaqController = FaqController;
exports.faqController = new FaqController();
//# sourceMappingURL=faq.controller.js.map