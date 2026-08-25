import { loadData, saveData } from "../utils/fileStore";
import { AppError } from "../utils/appError";

const INVOICE_FILE = "invoices.json";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientCompany?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  status: "Draft" | "Pending" | "Paid" | "Overdue";
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentMethod?: string;
  notes?: string;
  logoUrl?: string;
  signatureUrl?: string;
  signerName?: string;
  signerTitle?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class InvoiceService {
  static async getAll(): Promise<Invoice[]> {
    const list = await loadData<Invoice[]>(INVOICE_FILE, []);
    return list;
  }

  static async getById(id: string): Promise<Invoice> {
    const list = await loadData<Invoice[]>(INVOICE_FILE, []);
    const found = list.find((item) => item.id === id || item.invoiceNumber === id);
    if (!found) {
      throw AppError.notFound("Invoice not found");
    }
    return found;
  }

  static async create(data: Partial<Invoice>): Promise<Invoice> {
    const list = await loadData<Invoice[]>(INVOICE_FILE, []);
    const newInvoice: Invoice = {
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
      status: (data.status as any) || "Pending",
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
    await saveData(INVOICE_FILE, list);
    return newInvoice;
  }

  static async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const list = await loadData<Invoice[]>(INVOICE_FILE, []);
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) {
      throw AppError.notFound("Invoice not found");
    }

    const updated: Invoice = {
      ...list[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    await saveData(INVOICE_FILE, list);
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const list = await loadData<Invoice[]>(INVOICE_FILE, []);
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length === list.length) {
      throw AppError.notFound("Invoice not found");
    }
    await saveData(INVOICE_FILE, filtered);
    return true;
  }
}
