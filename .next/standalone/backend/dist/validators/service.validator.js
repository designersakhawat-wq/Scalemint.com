"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSchema = exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1).regex(/^[a-z0-9-]+$/),
        title: zod_1.z.string().min(2),
        subtitle: zod_1.z.string().optional(),
        heroHeadline: zod_1.z.string().min(5),
        description: zod_1.z.string().min(10),
        img: zod_1.z.string().min(1),
        whyTitle: zod_1.z.string().min(3),
        whyText: zod_1.z.string().min(10),
        benefitsImage: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            desc: zod_1.z.string(),
        })),
        process: zod_1.z.array(zod_1.z.object({
            step: zod_1.z.string(),
            title: zod_1.z.string(),
            desc: zod_1.z.string(),
            color: zod_1.z.string(),
        })),
        faqs: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            content: zod_1.z.string(),
        })),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateServiceSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
    body: zod_1.z.object({
        slug: zod_1.z.string().regex(/^[a-z0-9-]+$/).optional(),
        title: zod_1.z.string().min(2).optional(),
        subtitle: zod_1.z.string().optional(),
        heroHeadline: zod_1.z.string().min(5).optional(),
        description: zod_1.z.string().min(10).optional(),
        img: zod_1.z.string().optional(),
        whyTitle: zod_1.z.string().min(3).optional(),
        whyText: zod_1.z.string().min(10).optional(),
        benefitsImage: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            desc: zod_1.z.string(),
        })).optional(),
        process: zod_1.z.array(zod_1.z.object({
            step: zod_1.z.string(),
            title: zod_1.z.string(),
            desc: zod_1.z.string(),
            color: zod_1.z.string(),
        })).optional(),
        faqs: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            content: zod_1.z.string(),
        })).optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=service.validator.js.map