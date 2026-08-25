"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = exports.ServiceController = void 0;
const service_service_1 = require("../services/service.service");
const apiResponse_1 = require("../utils/apiResponse");
class ServiceController {
    async getAllServices(req, res, next) {
        try {
            const all = req.query.all === "true";
            const services = await service_service_1.serviceService.getAllServices(!all);
            return apiResponse_1.ApiResponse.success(res, services, "Services retrieved successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async getServiceBySlug(req, res, next) {
        try {
            const service = await service_service_1.serviceService.getServiceBySlug(req.params.slug);
            return apiResponse_1.ApiResponse.success(res, service, "Service details retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createService(req, res, next) {
        try {
            const service = await service_service_1.serviceService.createService(req.body);
            return apiResponse_1.ApiResponse.created(res, service, "Service created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updateService(req, res, next) {
        try {
            const service = await service_service_1.serviceService.updateService(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, service, "Service updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteService(req, res, next) {
        try {
            await service_service_1.serviceService.deleteService(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Service deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ServiceController = ServiceController;
exports.serviceController = new ServiceController();
//# sourceMappingURL=service.controller.js.map