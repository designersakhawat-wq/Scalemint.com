import { z } from "zod";

export const createPortfolioSchema = z.object({
  body: z.object({
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    title: z.string().min(2),
    category: z.string().min(2),
    image: z.string().min(1),
    clientName: z.string().optional(),
    projectUrl: z.string().optional(),
    description: z.string().optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().int().optional(),
  }),
});

export const updatePortfolioSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    title: z.string().min(2).optional(),
    category: z.string().min(2).optional(),
    image: z.string().optional(),
    clientName: z.string().optional(),
    projectUrl: z.string().optional(),
    description: z.string().optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().int().optional(),
  }),
});
