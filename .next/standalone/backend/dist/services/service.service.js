"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceService = exports.ServiceService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const SERVICES_FILE = "services.json";
class ServiceService {
    async getAllServices(onlyActive = true) {
        let services = (0, fileStore_1.loadData)(SERVICES_FILE, initialData_1.initialServices);
        return onlyActive ? services.filter((s) => s.isActive !== false) : services;
    }
    async getServiceBySlug(slug) {
        const services = (0, fileStore_1.loadData)(SERVICES_FILE, initialData_1.initialServices);
        const found = services.find((s) => s.slug === slug || s.id === slug);
        if (!found) {
            throw appError_1.AppError.notFound(`Service with slug '${slug}' not found`);
        }
        return found;
    }
    async createService(data) {
        const services = (0, fileStore_1.loadData)(SERVICES_FILE, initialData_1.initialServices);
        const slug = data.slug ||
            (data.title
                ? data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
                : `service-${Date.now()}`);
        const newService = {
            id: data.id || `srv_${Date.now()}`,
            slug,
            ...data,
            isActive: data.isActive ?? true,
            order: data.order ?? services.length + 1,
        };
        services.push(newService);
        (0, fileStore_1.saveData)(SERVICES_FILE, services);
        try {
            await prisma_1.prisma.service.create({ data: newService });
        }
        catch { }
        return newService;
    }
    async updateService(id, data) {
        const services = (0, fileStore_1.loadData)(SERVICES_FILE, initialData_1.initialServices);
        const idx = services.findIndex((s) => s.id === id || s.slug === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("Service not found");
        if (data.title && !data.slug) {
            data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        }
        services[idx] = { ...services[idx], ...data };
        (0, fileStore_1.saveData)(SERVICES_FILE, services);
        try {
            await prisma_1.prisma.service.update({
                where: { id: services[idx].id },
                data: data,
            });
        }
        catch { }
        return services[idx];
    }
    async deleteService(id) {
        const services = (0, fileStore_1.loadData)(SERVICES_FILE, initialData_1.initialServices);
        const filtered = services.filter((s) => s.id !== id && s.slug !== id);
        (0, fileStore_1.saveData)(SERVICES_FILE, filtered);
        try {
            await prisma_1.prisma.service.delete({
                where: { id },
            });
        }
        catch { }
        return { id };
    }
}
exports.ServiceService = ServiceService;
exports.serviceService = new ServiceService();
//# sourceMappingURL=service.service.js.map