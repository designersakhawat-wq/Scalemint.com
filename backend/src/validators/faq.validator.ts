import { z } from "zod";

export const createFaqSchema = z.object({
  body: z.object({
    question: z.string().min(5),
    answer: z.string().min(5),
    category: z.string().optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateFaqSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    question: z.string().min(5).optional(),
    answer: z.string().min(5).optional(),
    category: z.string().optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});
