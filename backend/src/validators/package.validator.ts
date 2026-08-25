import { z } from "zod";

export const createPackageSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.string().min(1),
    description: z.string().min(5),
    isPopular: z.boolean().optional(),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updatePackageSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    price: z.string().min(1).optional(),
    description: z.string().min(5).optional(),
    isPopular: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});
