"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.ContactService = void 0;
const prisma_1 = require("../config/prisma");
const client_1 = require("@prisma/client");
const appError_1 = require("../utils/appError");
const email_service_1 = require("./email.service");
const initialData_1 = require("../config/initialData");
let memoryContacts = [...initialData_1.initialContacts];
class ContactService {
    async submitContact(data) {
        let submission;
        try {
            submission = await prisma_1.prisma.contactSubmission.create({
                data: {
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    email: data.email.toLowerCase().trim(),
                    message: data.message.trim(),
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    status: client_1.ContactStatus.UNREAD,
                },
            });
        }
        catch {
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
        email_service_1.emailService.sendContactNotificationToAdmin(submission).catch(() => { });
        email_service_1.emailService.sendContactConfirmationToUser(submission).catch(() => { });
        return submission;
    }
    async getAllSubmissions({ page = 1, limit = 10, status, search, }) {
        try {
            const skip = (page - 1) * limit;
            const where = {
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
                prisma_1.prisma.contactSubmission.count({ where }),
                prisma_1.prisma.contactSubmission.findMany({
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
        }
        catch {
            let filtered = [...memoryContacts];
            if (status)
                filtered = filtered.filter((c) => c.status === status);
            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter((c) => c.firstName.toLowerCase().includes(s) ||
                    c.lastName.toLowerCase().includes(s) ||
                    c.email.toLowerCase().includes(s) ||
                    c.message.toLowerCase().includes(s));
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
    async getSubmissionById(id) {
        try {
            const submission = await prisma_1.prisma.contactSubmission.findUnique({
                where: { id },
            });
            if (submission)
                return submission;
        }
        catch {
            // Fallback
        }
        const sub = memoryContacts.find((c) => c.id === id);
        if (!sub)
            throw appError_1.AppError.notFound("Contact submission not found");
        return sub;
    }
    async updateStatus(id, status, notes) {
        try {
            return await prisma_1.prisma.contactSubmission.update({
                where: { id },
                data: {
                    status,
                    ...(notes !== undefined ? { notes } : {}),
                },
            });
        }
        catch {
            const sub = memoryContacts.find((c) => c.id === id);
            if (!sub)
                throw appError_1.AppError.notFound("Contact submission not found");
            sub.status = status;
            if (notes !== undefined)
                sub.notes = notes;
            sub.updatedAt = new Date().toISOString();
            return sub;
        }
    }
    async deleteSubmission(id) {
        try {
            return await prisma_1.prisma.contactSubmission.delete({
                where: { id },
            });
        }
        catch {
            const idx = memoryContacts.findIndex((c) => c.id === id);
            if (idx === -1)
                throw appError_1.AppError.notFound("Contact submission not found");
            memoryContacts.splice(idx, 1);
            return { id };
        }
    }
}
exports.ContactService = ContactService;
exports.contactService = new ContactService();
//# sourceMappingURL=contact.service.js.map