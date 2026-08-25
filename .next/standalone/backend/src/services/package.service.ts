import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialPackages } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const PACKAGES_FILE = "packages.json";

export class PackageService {
  async getAllPackages(onlyActive = true) {
    let packages = loadData<any[]>(PACKAGES_FILE, initialPackages);
    return onlyActive ? packages.filter((p) => p.isActive !== false) : packages;
  }

  async getPackageById(id: string) {
    const packages = loadData<any[]>(PACKAGES_FILE, initialPackages);
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) throw AppError.notFound("Pricing package not found");
    return pkg;
  }

  async createPackage(data: any) {
    const packages = loadData<any[]>(PACKAGES_FILE, initialPackages);
    const newPkg = {
      id: data.id || `pkg_${Date.now()}`,
      ...data,
      isPopular: data.isPopular ?? false,
      isActive: data.isActive ?? true,
      order: data.order ?? packages.length + 1,
    };
    packages.push(newPkg);
    saveData(PACKAGES_FILE, packages);

    try {
      await prisma.pricingPackage.create({ data: newPkg as any });
    } catch {}

    return newPkg;
  }

  async updatePackage(id: string, data: any) {
    const packages = loadData<any[]>(PACKAGES_FILE, initialPackages);
    const idx = packages.findIndex((p) => p.id === id);
    if (idx === -1) throw AppError.notFound("Pricing package not found");

    packages[idx] = { ...packages[idx], ...data };
    saveData(PACKAGES_FILE, packages);

    try {
      await prisma.pricingPackage.update({
        where: { id },
        data: data as any,
      });
    } catch {}

    return packages[idx];
  }

  async deletePackage(id: string) {
    const packages = loadData<any[]>(PACKAGES_FILE, initialPackages);
    const filtered = packages.filter((p) => p.id !== id);
    saveData(PACKAGES_FILE, filtered);

    try {
      await prisma.pricingPackage.delete({
        where: { id },
      });
    } catch {}

    return { id };
  }
}

export const packageService = new PackageService();
