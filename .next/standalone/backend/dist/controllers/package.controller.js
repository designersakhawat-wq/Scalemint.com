"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageController = exports.PackageController = void 0;
const package_service_1 = require("../services/package.service");
const apiResponse_1 = require("../utils/apiResponse");
class PackageController {
    async getAllPackages(req, res, next) {
        try {
            const all = req.query.all === "true";
            const packages = await package_service_1.packageService.getAllPackages(!all);
            return apiResponse_1.ApiResponse.success(res, packages, "Packages retrieved successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async getPackageById(req, res, next) {
        try {
            const pkg = await package_service_1.packageService.getPackageById(req.params.id);
            return apiResponse_1.ApiResponse.success(res, pkg, "Package retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createPackage(req, res, next) {
        try {
            const pkg = await package_service_1.packageService.createPackage(req.body);
            return apiResponse_1.ApiResponse.created(res, pkg, "Package created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updatePackage(req, res, next) {
        try {
            const pkg = await package_service_1.packageService.updatePackage(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, pkg, "Package updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deletePackage(req, res, next) {
        try {
            await package_service_1.packageService.deletePackage(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Package deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PackageController = PackageController;
exports.packageController = new PackageController();
//# sourceMappingURL=package.controller.js.map