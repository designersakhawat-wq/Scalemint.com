"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFaqSchema = exports.createFaqSchema = void 0;
const zod_1 = require("zod");
exports.createFaqSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string().min(5),
        answer: zod_1.z.string().min(5),
        category: zod_1.z.string().optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateFaqSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
    body: zod_1.z.object({
        question: zod_1.z.string().min(5).optional(),
        answer: zod_1.z.string().min(5).optional(),
        category: zod_1.z.string().optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=faq.validator.js.map