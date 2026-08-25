import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contact.service";
import { ApiResponse } from "../utils/apiResponse";
import { ContactStatus } from "@prisma/client";

export class ContactController {
  async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      const ipAddress = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const submission = await contactService.submitContact({
        ...req.body,
        ipAddress,
        userAgent,
      });

      return ApiResponse.created(
        res,
        submission,
        "Thank you! Your message has been received and our team will get back to you shortly."
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllSubmissions(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const status = req.query.status as ContactStatus | undefined;
      const search = req.query.search as string | undefined;

      const { items, meta } = await contactService.getAllSubmissions({
        page,
        limit,
        status,
        search,
      });

      return ApiResponse.success(
        res,
        items,
        "Contact submissions retrieved successfully",
        200,
        meta
      );
    } catch (error) {
      next(error);
    }
  }

  async getSubmissionById(req: Request, res: Response, next: NextFunction) {
    try {
      const submission = await contactService.getSubmissionById(req.params.id);
      return ApiResponse.success(res, submission, "Contact submission retrieved");
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, notes } = req.body;
      const submission = await contactService.updateStatus(req.params.id, status, notes);
      return ApiResponse.success(res, submission, "Contact status updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      await contactService.deleteSubmission(req.params.id);
      return ApiResponse.success(res, null, "Contact submission deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
