"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const invoice_service_1 = require("../services/invoice.service");
class InvoiceController {
    static async getAll(_req, res, next) {
        try {
            const invoices = await invoice_service_1.InvoiceService.getAll();
            return res.status(200).json({
                success: true,
                message: "Invoices retrieved successfully",
                data: invoices,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const invoice = await invoice_service_1.InvoiceService.getById(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Invoice retrieved successfully",
                data: invoice,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const invoice = await invoice_service_1.InvoiceService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Invoice created successfully",
                data: invoice,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const invoice = await invoice_service_1.InvoiceService.update(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: "Invoice updated successfully",
                data: invoice,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            await invoice_service_1.InvoiceService.delete(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Invoice deleted successfully",
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map