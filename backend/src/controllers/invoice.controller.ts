import { Request, Response, NextFunction } from "express";
import { InvoiceService } from "../services/invoice.service";

export class InvoiceController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const invoices = await InvoiceService.getAll();
      return res.status(200).json({
        success: true,
        message: "Invoices retrieved successfully",
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const invoice = await InvoiceService.getById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Invoice retrieved successfully",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const invoice = await InvoiceService.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Invoice created successfully",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const invoice = await InvoiceService.update(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: "Invoice updated successfully",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await InvoiceService.delete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Invoice deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
