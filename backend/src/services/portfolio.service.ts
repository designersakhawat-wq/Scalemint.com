import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialPortfolio } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const PORTFOLIO_FILE = "portfolio.json";

export class PortfolioService {
  async getAllProjects(options: { category?: string; isFeatured?: boolean; onlyActive?: boolean } | boolean = true) {
    let portfolio = loadData<any[]>(PORTFOLIO_FILE, initialPortfolio);
    
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

  async getProjectBySlug(slug: string) {
    const portfolio = loadData<any[]>(PORTFOLIO_FILE, initialPortfolio);
    const project = portfolio.find((p) => p.slug === slug || p.id === slug);
    if (!project) throw AppError.notFound(`Project with slug '${slug}' not found`);
    return project;
  }

  async createProject(data: any) {
    const portfolio = loadData<any[]>(PORTFOLIO_FILE, initialPortfolio);
    const slug =
      data.slug ||
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
    saveData(PORTFOLIO_FILE, portfolio);

    try {
      await prisma.portfolioProject.create({ data: newProject as any });
    } catch {}

    return newProject;
  }

  async updateProject(id: string, data: any) {
    const portfolio = loadData<any[]>(PORTFOLIO_FILE, initialPortfolio);
    const idx = portfolio.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) throw AppError.notFound("Portfolio project not found");

    if (data.title && !data.slug) {
      data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    }

    portfolio[idx] = { ...portfolio[idx], ...data };
    saveData(PORTFOLIO_FILE, portfolio);

    try {
      await prisma.portfolioProject.update({
        where: { id: portfolio[idx].id },
        data: data as any,
      });
    } catch {}

    return portfolio[idx];
  }

  async deleteProject(id: string) {
    const portfolio = loadData<any[]>(PORTFOLIO_FILE, initialPortfolio);
    const filtered = portfolio.filter((p) => p.id !== id && p.slug !== id);
    saveData(PORTFOLIO_FILE, filtered);

    try {
      await prisma.portfolioProject.delete({
        where: { id },
      });
    } catch {}

    return { id };
  }
}

export const portfolioService = new PortfolioService();
