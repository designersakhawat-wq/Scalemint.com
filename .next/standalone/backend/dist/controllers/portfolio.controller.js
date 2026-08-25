"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioController = exports.PortfolioController = void 0;
const portfolio_service_1 = require("../services/portfolio.service");
const apiResponse_1 = require("../utils/apiResponse");
class PortfolioController {
    async getAllProjects(req, res, next) {
        try {
            const category = req.query.category;
            const isFeatured = req.query.featured !== undefined ? req.query.featured === "true" : undefined;
            const projects = await portfolio_service_1.portfolioService.getAllProjects({ category, isFeatured });
            return apiResponse_1.ApiResponse.success(res, projects, "Portfolio projects retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async getProjectBySlug(req, res, next) {
        try {
            const project = await portfolio_service_1.portfolioService.getProjectBySlug(req.params.slug);
            return apiResponse_1.ApiResponse.success(res, project, "Project details retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createProject(req, res, next) {
        try {
            const project = await portfolio_service_1.portfolioService.createProject(req.body);
            return apiResponse_1.ApiResponse.created(res, project, "Project created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updateProject(req, res, next) {
        try {
            const project = await portfolio_service_1.portfolioService.updateProject(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, project, "Project updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProject(req, res, next) {
        try {
            await portfolio_service_1.portfolioService.deleteProject(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Project deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PortfolioController = PortfolioController;
exports.portfolioController = new PortfolioController();
//# sourceMappingURL=portfolio.controller.js.map