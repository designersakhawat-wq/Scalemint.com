"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactStatusSchema = exports.createContactSubmissionSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createContactSubmissionSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required").max(100),
        lastName: zod_1.z.string().min(1, "Last name is required").max(100),
        email: zod_1.z.string().email("Please provide a valid email address"),
        message: zod_1.z.string().min(5, "Message must be at least 5 characters long").max(5000),
    }),
});
exports.updateContactStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "ID is required"),
    }),
    body: zod_1.z.object({
        status: zod_1.z.nativeEnum(client_1.ContactStatus, {
            errorMap: () => ({ message: "Invalid status value" }),
        }),
        notes: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=contact.validator.js.map