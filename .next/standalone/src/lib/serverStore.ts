import fs from "fs";
import path from "path";
import {
  initialServices,
  initialBlogs,
  initialPortfolio,
  initialPackages,
  initialTeam,
  initialFaqs,
  initialInvoices,
} from "@/data/initialData";
import { defaultSettings } from "@/context/SiteConfigContext";

function getDataDirs(): string[] {
  const dirs: string[] = [
    path.join(process.cwd(), "data"),
    path.join(process.cwd(), ".next", "standalone", "data"),
    path.join(process.cwd(), "..", "data"),
  ];
  return Array.from(new Set(dirs));
}

function ensureDirectories() {
  const dirs = getDataDirs();
  for (const dir of dirs) {
    try {
      const parent = path.dirname(dir);
      if (fs.existsSync(parent) && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch {}
  }
}

// In-memory runtime cache for serverless / read-only filesystem fallbacks
const runtimeStore: Record<string, any> = {
  "services.json": initialServices,
  "blogs.json": initialBlogs,
  "portfolio.json": initialPortfolio,
  "packages.json": initialPackages,
  "team.json": initialTeam,
  "faqs.json": initialFaqs,
  "invoices.json": initialInvoices,
  "settings.json": defaultSettings,
  "contacts.json": [
    {
      id: "cnt_1",
      firstName: "Alexander",
      lastName: "Wright",
      email: "alex@wrightenterprises.com",
      message: "Looking for an end-to-end rebranding package and custom e-commerce web application.",
      status: "UNREAD",
      createdAt: new Date().toISOString(),
    },
  ],
};

export function getCollection<T = any>(filename: string, defaultData: T): T {
  ensureDirectories();
  const dirs = getDataDirs();

  for (const dir of dirs) {
    const filePath = path.join(dir, filename);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(content);
        if (parsed !== undefined && parsed !== null) {
          runtimeStore[filename] = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.error(`Error reading ${filename} from ${filePath}:`, err);
    }
  }

  if (runtimeStore[filename]) {
    return runtimeStore[filename] as T;
  }

  // Save initial fallback to disk
  try {
    const primaryPath = path.join(process.cwd(), "data", filename);
    const parentDir = path.dirname(primaryPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(primaryPath, JSON.stringify(defaultData, null, 2), "utf-8");
  } catch {}

  runtimeStore[filename] = defaultData;
  return defaultData;
}

export function saveCollection<T = any>(filename: string, data: T): void {
  runtimeStore[filename] = data;
  ensureDirectories();
  const dirs = getDataDirs();
  const serialized = JSON.stringify(data, null, 2);

  for (const dir of dirs) {
    try {
      const parent = path.dirname(dir);
      if (fs.existsSync(parent) || dir === path.join(process.cwd(), "data")) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, filename);
        fs.writeFileSync(filePath, serialized, "utf-8");
      }
    } catch (err) {
      console.error(`Error writing ${filename} to ${dir}:`, err);
    }
  }
}
