"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageSchema = exports.createPackageSchema = void 0;
const zod_1 = require("zod");
exports.createPackageSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2),
        price: zod_1.z.string().min(1),
        description: zod_1.z.string().min(5),
        isPopular: zod_1.z.boolean().optional(),
        features: zod_1.z.array(zod_1.z.string()).min(1, "At least one feature is required"),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updatePackageSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        price: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().min(5).optional(),
        isPopular: zod_1.z.boolean().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        order: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
//# sourceMappingURL=package.validator.js.map