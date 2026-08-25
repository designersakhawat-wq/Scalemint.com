"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const fileStore_1 = require("../utils/fileStore");
const appError_1 = require("../utils/appError");
const INVOICE_FILE = "invoices.json";
class InvoiceService {
    static async getAll() {
        const list = await (0, fileStore_1.loadData)(INVOICE_FILE, []);
        return list;
    }
    static async getById(id) {
        const list = await (0, fileStore_1.loadData)(INVOICE_FILE, []);
        const found = list.find((item) => item.id === id || item.invoiceNumber === id);
        if (!found) {
            throw appError_1.AppError.notFound("Invoice not found");
        }
        return found;
    }
    static async create(data) {
        const list = await (0, fileStore_1.loadData)(INVOICE_FILE, []);
        const newInvoice = {
            id: data.id || `inv_${Date.now()}`,
            invoiceNumber: data.invoiceNumber || `INV-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, "0")}`,
            clientName: data.clientName || "Valued Client",
            clientCompany: data.clientCompany || "",
            clientEmail: data.clientEmail || "",
            clientPhone: data.clientPhone || "",
            clientAddress: data.clientAddress || "",
            issueDate: data.issueDate || new Date().toISOString().split("T")[0],
            dueDate: data.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
            currency: data.currency || "USD ($)",
            status: data.status || "Pending",
            items: data.items || [],
            subtotal: data.subtotal || 0,
            discount: data.discount || 0,
            taxRate: data.taxRate || 0,
            taxAmount: data.taxAmount || 0,
            total: data.total || 0,
            paymentMethod: data.paymentMethod || "Bank Transfer / Online Payment",
            notes: data.notes || "Thank you for working with Scaleminte!",
            logoUrl: data.logoUrl || "",
            signatureUrl: data.signatureUrl || "",
            signerName: data.signerName || "Scaleminte Finance & Accounts",
            signerTitle: data.signerTitle || "Authorized Officer",
            companyName: data.companyName || "Scaleminte",
            companyAddress: data.companyAddress || "360° Creative & Digital Support Agency",
            companyEmail: data.companyEmail || "hello@scaleminte.com",
            companyPhone: data.companyPhone || "+1 (555) 019-2834",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        list.unshift(newInvoice);
        await (0, fileStore_1.saveData)(INVOICE_FILE, list);
        return newInvoice;
    }
    static async update(id, data) {
        const list = await (0, fileStore_1.loadData)(INVOICE_FILE, []);
        const index = list.findIndex((item) => item.id === id);
        if (index === -1) {
            throw appError_1.AppError.notFound("Invoice not found");
        }
        const updated = {
            ...list[index],
            ...data,
            id,
            updatedAt: new Date().toISOString(),
        };
        list[index] = updated;
        await (0, fileStore_1.saveData)(INVOICE_FILE, list);
        return updated;
    }
    static async delete(id) {
        const list = await (0, fileStore_1.loadData)(INVOICE_FILE, []);
        const filtered = list.filter((item) => item.id !== id);
        if (filtered.length === list.length) {
            throw appError_1.AppError.notFound("Invoice not found");
        }
        await (0, fileStore_1.saveData)(INVOICE_FILE, filtered);
        return true;
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map