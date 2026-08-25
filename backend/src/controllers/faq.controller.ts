import { Request, Response, NextFunction } from "express";
import { faqService } from "../services/faq.service";
import { ApiResponse } from "../utils/apiResponse";

export class FaqController {
  async getAllFaqs(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const all = req.query.all === "true";
      const faqs = await faqService.getAllFaqs(category, !all);
      return ApiResponse.success(res, faqs, "FAQs retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getFaqById(req: Request, res: Response, next: NextFunction) {
    try {
      const faq = await faqService.getFaqById(req.params.id);
      return ApiResponse.success(res, faq, "FAQ retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const faq = await faqService.createFaq(req.body);
      return ApiResponse.created(res, faq, "FAQ created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateFaq(req: Request, res: Response, next: NextFunction) {
    try {
      const faq = await faqService.updateFaq(req.params.id, req.body);
      return ApiResponse.success(res, faq, "FAQ updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteFaq(req: Request, res: Response, next: NextFunction) {
    try {
      await faqService.deleteFaq(req.params.id);
      return ApiResponse.success(res, null, "FAQ deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const faqController = new FaqController();
