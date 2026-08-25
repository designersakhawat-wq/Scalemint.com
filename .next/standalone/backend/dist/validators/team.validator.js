"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberSchema = exports.createTeamMemberSchema = void 0;
const zod_1 = require("zod");
exports.createTeamMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().optional(),
        name: zod_1.z.string().min(1),
        role: zod_1.z.string().min(1),
        img: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        expertise: zod_1.z.array(zod_1.z.string()).optional(),
        tools: zod_1.z.array(zod_1.z.string()).optional(),
        experience: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            company: zod_1.z.string(),
            period: zod_1.z.string(),
        })).optional(),
        education: zod_1.z.array(zod_1.z.object({
            degree: zod_1.z.string(),
            institution: zod_1.z.string(),
            year: zod_1.z.string(),
        })).optional(),
        fiverrStatus: zod_1.z.string().optional(),
        fiverrLink: zod_1.z.string().optional(),
        upworkStatus: zod_1.z.string().optional(),
        upworkLink: zod_1.z.string().optional(),
        facebookUrl: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateTeamMemberSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
    body: zod_1.z.object({
        slug: zod_1.z.string().optional(),
        name: zod_1.z.string().min(1).optional(),
        role: zod_1.z.string().min(1).optional(),
        img: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        expertise: zod_1.z.array(zod_1.z.string()).optional(),
        tools: zod_1.z.array(zod_1.z.string()).optional(),
        experience: zod_1.z.array(zod_1.z.object({
            title: zod_1.z.string(),
            company: zod_1.z.string(),
            period: zod_1.z.string(),
        })).optional(),
        education: zod_1.z.array(zod_1.z.object({
            degree: zod_1.z.string(),
            institution: zod_1.z.string(),
            year: zod_1.z.string(),
        })).optional(),
        fiverrStatus: zod_1.z.string().optional(),
        fiverrLink: zod_1.z.string().optional(),
        upworkStatus: zod_1.z.string().optional(),
        upworkLink: zod_1.z.string().optional(),
        facebookUrl: zod_1.z.string().optional(),
        linkedinUrl: zod_1.z.string().optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=team.validator.js.map