import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    title: z.string().min(2),
    subtitle: z.string().optional(),
    heroHeadline: z.string().min(5),
    description: z.string().min(10),
    img: z.string().min(1),
    whyTitle: z.string().min(3),
    whyText: z.string().min(10),
    benefitsImage: z.string().optional(),
    features: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ),
    process: z.array(
      z.object({
        step: z.string(),
        title: z.string(),
        desc: z.string(),
        color: z.string(),
      })
    ),
    faqs: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    ),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    title: z.string().min(2).optional(),
    subtitle: z.string().optional(),
    heroHeadline: z.string().min(5).optional(),
    description: z.string().min(10).optional(),
    img: z.string().optional(),
    whyTitle: z.string().min(3).optional(),
    whyText: z.string().min(10).optional(),
    benefitsImage: z.string().optional(),
    features: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ).optional(),
    process: z.array(
      z.object({
        step: z.string(),
        title: z.string(),
        desc: z.string(),
        color: z.string(),
      })
    ).optional(),
    faqs: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    ).optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});
