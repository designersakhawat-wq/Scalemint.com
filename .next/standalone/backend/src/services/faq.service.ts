import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialFaqs } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const FAQS_FILE = "faqs.json";

export class FaqService {
  async getAllFaqs(category?: string, onlyActive = true) {
    let faqs = loadData<any[]>(FAQS_FILE, initialFaqs);
    if (onlyActive) {
      faqs = faqs.filter((f) => f.isActive !== false);
    }
    if (category) {
      faqs = faqs.filter((f) => f.category?.toLowerCase() === category.toLowerCase());
    }
    return faqs;
  }

  async getFaqById(id: string) {
    const faqs = loadData<any[]>(FAQS_FILE, initialFaqs);
    const faq = faqs.find((f) => f.id === id);
    if (!faq) throw AppError.notFound("FAQ not found");
    return faq;
  }

  async createFaq(data: any) {
    const faqs = loadData<any[]>(FAQS_FILE, initialFaqs);
    const newFaq = {
      id: data.id || `faq_${Date.now()}`,
      ...data,
      isActive: data.isActive ?? true,
      order: data.order ?? faqs.length + 1,
    };
    faqs.push(newFaq);
    saveData(FAQS_FILE, faqs);

    try {
      const p = prisma as any;
      if (p.faq) await p.faq.create({ data: newFaq });
      else if (p.fAQ) await p.fAQ.create({ data: newFaq });
    } catch {}

    return newFaq;
  }

  async updateFaq(id: string, data: any) {
    const faqs = loadData<any[]>(FAQS_FILE, initialFaqs);
    const idx = faqs.findIndex((f) => f.id === id);
    if (idx === -1) throw AppError.notFound("FAQ not found");

    faqs[idx] = { ...faqs[idx], ...data };
    saveData(FAQS_FILE, faqs);

    try {
      const p = prisma as any;
      if (p.faq) await p.faq.update({ where: { id }, data });
      else if (p.fAQ) await p.fAQ.update({ where: { id }, data });
    } catch {}

    return faqs[idx];
  }

  async deleteFaq(id: string) {
    const faqs = loadData<any[]>(FAQS_FILE, initialFaqs);
    const filtered = faqs.filter((f) => f.id !== id);
    saveData(FAQS_FILE, filtered);

    try {
      const p = prisma as any;
      if (p.faq) await p.faq.delete({ where: { id } });
      else if (p.fAQ) await p.fAQ.delete({ where: { id } });
    } catch {}

    return { id };
  }
}

export const faqService = new FaqService();
