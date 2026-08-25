import { prisma } from "../config/prisma";
import { ContactStatus, Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import { emailService } from "./email.service";
import { initialContacts } from "../config/initialData";

let memoryContacts = [...initialContacts];

export class ContactService {
  async submitContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    let submission: any;

    try {
      submission = await prisma.contactSubmission.create({
        data: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.toLowerCase().trim(),
          message: data.message.trim(),
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          status: ContactStatus.UNREAD,
        },
      });
    } catch {
      submission = {
        id: `cnt_${Date.now()}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        message: data.message.trim(),
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        status: "UNREAD",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryContacts.unshift(submission);
    }

    // Send email notifications
    emailService.sendContactNotificationToAdmin(submission).catch(() => {});
    emailService.sendContactConfirmationToUser(submission).catch(() => {});

    return submission;
  }

  async getAllSubmissions({
    page = 1,
    limit = 10,
    status,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: ContactStatus;
    search?: string;
  }) {
    try {
      const skip = (page - 1) * limit;

      const where: Prisma.ContactSubmissionWhereInput = {
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { message: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      };

      const [total, items] = await Promise.all([
        prisma.contactSubmission.count({ where }),
        prisma.contactSubmission.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        items,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch {
      let filtered = [...memoryContacts];
      if (status) filtered = filtered.filter((c) => c.status === status);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.firstName.toLowerCase().includes(s) ||
            c.lastName.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            c.message.toLowerCase().includes(s)
        );
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const skip = (page - 1) * limit;
      const items = filtered.slice(skip, skip + limit);

      return {
        items,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    }
  }

  async getSubmissionById(id: string) {
    try {
      const submission = await prisma.contactSubmission.findUnique({
        where: { id },
      });
      if (submission) return submission;
    } catch {
      // Fallback
    }

    const sub = memoryContacts.find((c) => c.id === id);
    if (!sub) throw AppError.notFound("Contact submission not found");
    return sub;
  }

  async updateStatus(id: string, status: ContactStatus, notes?: string) {
    try {
      return await prisma.contactSubmission.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      });
    } catch {
      const sub = memoryContacts.find((c) => c.id === id);
      if (!sub) throw AppError.notFound("Contact submission not found");
      sub.status = status as any;
      if (notes !== undefined) sub.notes = notes;
      sub.updatedAt = new Date().toISOString();
      return sub;
    }
  }

  async deleteSubmission(id: string) {
    try {
      return await prisma.contactSubmission.delete({
        where: { id },
      });
    } catch {
      const idx = memoryContacts.findIndex((c) => c.id === id);
      if (idx === -1) throw AppError.notFound("Contact submission not found");
      memoryContacts.splice(idx, 1);
      return { id };
    }
  }
}

export const contactService = new ContactService();
