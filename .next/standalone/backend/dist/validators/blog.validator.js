"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
        title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
        excerpt: zod_1.z.string().min(10, "Excerpt must be at least 10 characters"),
        content: zod_1.z.string().optional(),
        category: zod_1.z.string().min(2, "Category is required"),
        image: zod_1.z.string().min(1, "Image URL or path is required"),
        authorName: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
        publishedAt: zod_1.z.string().datetime().optional(),
    }),
});
exports.updateBlogSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "ID is required"),
    }),
    body: zod_1.z.object({
        slug: zod_1.z.string().regex(/^[a-z0-9-]+$/).optional(),
        title: zod_1.z.string().min(3).optional(),
        excerpt: zod_1.z.string().min(10).optional(),
        content: zod_1.z.string().optional(),
        category: zod_1.z.string().min(2).optional(),
        image: zod_1.z.string().optional(),
        authorName: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
        publishedAt: zod_1.z.string().datetime().optional(),
    }),
});
//# sourceMappingURL=blog.validator.js.map