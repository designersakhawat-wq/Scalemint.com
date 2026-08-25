"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageService = exports.PackageService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const PACKAGES_FILE = "packages.json";
class PackageService {
    async getAllPackages(onlyActive = true) {
        let packages = (0, fileStore_1.loadData)(PACKAGES_FILE, initialData_1.initialPackages);
        return onlyActive ? packages.filter((p) => p.isActive !== false) : packages;
    }
    async getPackageById(id) {
        const packages = (0, fileStore_1.loadData)(PACKAGES_FILE, initialData_1.initialPackages);
        const pkg = packages.find((p) => p.id === id);
        if (!pkg)
            throw appError_1.AppError.notFound("Pricing package not found");
        return pkg;
    }
    async createPackage(data) {
        const packages = (0, fileStore_1.loadData)(PACKAGES_FILE, initialData_1.initialPackages);
        const newPkg = {
            id: data.id || `pkg_${Date.now()}`,
            ...data,
            isPopular: data.isPopular ?? false,
            isActive: data.isActive ?? true,
            order: data.order ?? packages.length + 1,
        };
        packages.push(newPkg);
        (0, fileStore_1.saveData)(PACKAGES_FILE, packages);
        try {
            await prisma_1.prisma.pricingPackage.create({ data: newPkg });
        }
        catch { }
        return newPkg;
    }
    async updatePackage(id, data) {
        const packages = (0, fileStore_1.loadData)(PACKAGES_FILE, initialData_1.initialPackages);
        const idx = packages.findIndex((p) => p.id === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("Pricing package not found");
        packages[idx] = { ...packages[idx], ...data };
        (0, fileStore_1.saveData)(PACKAGES_FILE, packages);
        try {
            await prisma_1.prisma.pricingPackage.update({
                where: { id },
                data: data,
            });
        }
        catch { }
        return packages[idx];
    }
    async deletePackage(id) {
        const packages = (0, fileStore_1.loadData)(PACKAGES_FILE, initialData_1.initialPackages);
        const filtered = packages.filter((p) => p.id !== id);
        (0, fileStore_1.saveData)(PACKAGES_FILE, filtered);
        try {
            await prisma_1.prisma.pricingPackage.delete({
                where: { id },
            });
        }
        catch { }
        return { id };
    }
}
exports.PackageService = PackageService;
exports.packageService = new PackageService();
//# sourceMappingURL=package.service.js.map