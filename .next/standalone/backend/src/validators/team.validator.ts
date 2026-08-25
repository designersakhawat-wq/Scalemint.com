import { z } from "zod";

export const createTeamMemberSchema = z.object({
  body: z.object({
    slug: z.string().optional(),
    name: z.string().min(1),
    role: z.string().min(1),
    img: z.string().optional(),
    bio: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    experience: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
      })
    ).optional(),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
      })
    ).optional(),
    fiverrStatus: z.string().optional(),
    fiverrLink: z.string().optional(),
    upworkStatus: z.string().optional(),
    upworkLink: z.string().optional(),
    facebookUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateTeamMemberSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    slug: z.string().optional(),
    name: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    img: z.string().optional(),
    bio: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    experience: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
      })
    ).optional(),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
      })
    ).optional(),
    fiverrStatus: z.string().optional(),
    fiverrLink: z.string().optional(),
    upworkStatus: z.string().optional(),
    upworkLink: z.string().optional(),
    facebookUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    order: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});
