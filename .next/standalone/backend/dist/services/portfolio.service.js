"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioService = exports.PortfolioService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const PORTFOLIO_FILE = "portfolio.json";
class PortfolioService {
    async getAllProjects(options = true) {
        let portfolio = (0, fileStore_1.loadData)(PORTFOLIO_FILE, initialData_1.initialPortfolio);
        if (typeof options === "boolean") {
            return options ? portfolio.filter((p) => p.isActive !== false) : portfolio;
        }
        const { category, isFeatured, onlyActive = true } = options;
        if (onlyActive) {
            portfolio = portfolio.filter((p) => p.isActive !== false);
        }
        if (category) {
            portfolio = portfolio.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
        }
        if (isFeatured !== undefined) {
            portfolio = portfolio.filter((p) => Boolean(p.isFeatured) === isFeatured);
        }
        return portfolio;
    }
    async getProjectBySlug(slug) {
        const portfolio = (0, fileStore_1.loadData)(PORTFOLIO_FILE, initialData_1.initialPortfolio);
        const project = portfolio.find((p) => p.slug === slug || p.id === slug);
        if (!project)
            throw appError_1.AppError.notFound(`Project with slug '${slug}' not found`);
        return project;
    }
    async createProject(data) {
        const portfolio = (0, fileStore_1.loadData)(PORTFOLIO_FILE, initialData_1.initialPortfolio);
        const slug = data.slug ||
            (data.title
                ? data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
                : `project-${Date.now()}`);
        const newProject = {
            id: data.id || `port_${Date.now()}`,
            slug,
            ...data,
            isActive: data.isActive ?? true,
            order: data.order ?? portfolio.length + 1,
        };
        portfolio.push(newProject);
        (0, fileStore_1.saveData)(PORTFOLIO_FILE, portfolio);
        try {
            await prisma_1.prisma.portfolioProject.create({ data: newProject });
        }
        catch { }
        return newProject;
    }
    async updateProject(id, data) {
        const portfolio = (0, fileStore_1.loadData)(PORTFOLIO_FILE, initialData_1.initialPortfolio);
        const idx = portfolio.findIndex((p) => p.id === id || p.slug === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("Portfolio project not found");
        if (data.title && !data.slug) {
            data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        }
        portfolio[idx] = { ...portfolio[idx], ...data };
        (0, fileStore_1.saveData)(PORTFOLIO_FILE, portfolio);
        try {
            await prisma_1.prisma.portfolioProject.update({
                where: { id: portfolio[idx].id },
                data: data,
            });
        }
        catch { }
        return portfolio[idx];
    }
    async deleteProject(id) {
        const portfolio = (0, fileStore_1.loadData)(PORTFOLIO_FILE, initialData_1.initialPortfolio);
        const filtered = portfolio.filter((p) => p.id !== id && p.slug !== id);
        (0, fileStore_1.saveData)(PORTFOLIO_FILE, filtered);
        try {
            await prisma_1.prisma.portfolioProject.delete({
                where: { id },
            });
        }
        catch { }
        return { id };
    }
}
exports.PortfolioService = PortfolioService;
exports.portfolioService = new PortfolioService();
//# sourceMappingURL=portfolio.service.js.map