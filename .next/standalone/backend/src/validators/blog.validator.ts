import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    content: z.string().optional(),
    category: z.string().min(2, "Category is required"),
    image: z.string().min(1, "Image URL or path is required"),
    authorName: z.string().optional(),
    isPublished: z.boolean().optional(),
    publishedAt: z.string().datetime().optional(),
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID is required"),
  }),
  body: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    title: z.string().min(3).optional(),
    excerpt: z.string().min(10).optional(),
    content: z.string().optional(),
    category: z.string().min(2).optional(),
    image: z.string().optional(),
    authorName: z.string().optional(),
    isPublished: z.boolean().optional(),
    publishedAt: z.string().datetime().optional(),
  }),
});
