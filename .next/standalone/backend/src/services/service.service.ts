import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialServices } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const SERVICES_FILE = "services.json";

export class ServiceService {
  async getAllServices(onlyActive = true) {
    let services = loadData<any[]>(SERVICES_FILE, initialServices);
    return onlyActive ? services.filter((s) => s.isActive !== false) : services;
  }

  async getServiceBySlug(slug: string) {
    const services = loadData<any[]>(SERVICES_FILE, initialServices);
    const found = services.find((s) => s.slug === slug || s.id === slug);
    if (!found) {
      throw AppError.notFound(`Service with slug '${slug}' not found`);
    }
    return found;
  }

  async createService(data: any) {
    const services = loadData<any[]>(SERVICES_FILE, initialServices);
    const slug =
      data.slug ||
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
    saveData(SERVICES_FILE, services);

    try {
      await prisma.service.create({ data: newService as any });
    } catch {}

    return newService;
  }

  async updateService(id: string, data: any) {
    const services = loadData<any[]>(SERVICES_FILE, initialServices);
    const idx = services.findIndex((s) => s.id === id || s.slug === id);
    if (idx === -1) throw AppError.notFound("Service not found");

    if (data.title && !data.slug) {
      data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    }

    services[idx] = { ...services[idx], ...data };
    saveData(SERVICES_FILE, services);

    try {
      await prisma.service.update({
        where: { id: services[idx].id },
        data: data as any,
      });
    } catch {}

    return services[idx];
  }

  async deleteService(id: string) {
    const services = loadData<any[]>(SERVICES_FILE, initialServices);
    const filtered = services.filter((s) => s.id !== id && s.slug !== id);
    saveData(SERVICES_FILE, filtered);

    try {
      await prisma.service.delete({
        where: { id },
      });
    } catch {}

    return { id };
  }
}

export const serviceService = new ServiceService();
