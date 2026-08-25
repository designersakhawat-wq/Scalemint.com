"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePortfolioSchema = exports.createPortfolioSchema = void 0;
const zod_1 = require("zod");
exports.createPortfolioSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1).regex(/^[a-z0-9-]+$/),
        title: zod_1.z.string().min(2),
        category: zod_1.z.string().min(2),
        image: zod_1.z.string().min(1),
        clientName: zod_1.z.string().optional(),
        projectUrl: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        order: zod_1.z.number().int().optional(),
    }),
});
exports.updatePortfolioSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
    body: zod_1.z.object({
        slug: zod_1.z.string().regex(/^[a-z0-9-]+$/).optional(),
        title: zod_1.z.string().min(2).optional(),
        category: zod_1.z.string().min(2).optional(),
        image: zod_1.z.string().optional(),
        clientName: zod_1.z.string().optional(),
        projectUrl: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        order: zod_1.z.number().int().optional(),
    }),
});
//# sourceMappingURL=portfolio.validator.js.map