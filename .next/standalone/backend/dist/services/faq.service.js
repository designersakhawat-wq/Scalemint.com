"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqService = exports.FaqService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const FAQS_FILE = "faqs.json";
class FaqService {
    async getAllFaqs(category, onlyActive = true) {
        let faqs = (0, fileStore_1.loadData)(FAQS_FILE, initialData_1.initialFaqs);
        if (onlyActive) {
            faqs = faqs.filter((f) => f.isActive !== false);
        }
        if (category) {
            faqs = faqs.filter((f) => f.category?.toLowerCase() === category.toLowerCase());
        }
        return faqs;
    }
    async getFaqById(id) {
        const faqs = (0, fileStore_1.loadData)(FAQS_FILE, initialData_1.initialFaqs);
        const faq = faqs.find((f) => f.id === id);
        if (!faq)
            throw appError_1.AppError.notFound("FAQ not found");
        return faq;
    }
    async createFaq(data) {
        const faqs = (0, fileStore_1.loadData)(FAQS_FILE, initialData_1.initialFaqs);
        const newFaq = {
            id: data.id || `faq_${Date.now()}`,
            ...data,
            isActive: data.isActive ?? true,
            order: data.order ?? faqs.length + 1,
        };
        faqs.push(newFaq);
        (0, fileStore_1.saveData)(FAQS_FILE, faqs);
        try {
            const p = prisma_1.prisma;
            if (p.faq)
                await p.faq.create({ data: newFaq });
            else if (p.fAQ)
                await p.fAQ.create({ data: newFaq });
        }
        catch { }
        return newFaq;
    }
    async updateFaq(id, data) {
        const faqs = (0, fileStore_1.loadData)(FAQS_FILE, initialData_1.initialFaqs);
        const idx = faqs.findIndex((f) => f.id === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("FAQ not found");
        faqs[idx] = { ...faqs[idx], ...data };
        (0, fileStore_1.saveData)(FAQS_FILE, faqs);
        try {
            const p = prisma_1.prisma;
            if (p.faq)
                await p.faq.update({ where: { id }, data });
            else if (p.fAQ)
                await p.fAQ.update({ where: { id }, data });
        }
        catch { }
        return faqs[idx];
    }
    async deleteFaq(id) {
        const faqs = (0, fileStore_1.loadData)(FAQS_FILE, initialData_1.initialFaqs);
        const filtered = faqs.filter((f) => f.id !== id);
        (0, fileStore_1.saveData)(FAQS_FILE, filtered);
        try {
            const p = prisma_1.prisma;
            if (p.faq)
                await p.faq.delete({ where: { id } });
            else if (p.fAQ)
                await p.fAQ.delete({ where: { id } });
        }
        catch { }
        return { id };
    }
}
exports.FaqService = FaqService;
exports.faqService = new FaqService();
//# sourceMappingURL=faq.service.js.map