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

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
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
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      runtimeStore[filename] = parsed;
      return parsed;
    }
  } catch (err) {
    console.error(`Error reading ${filename} from disk:`, err);
  }

  if (runtimeStore[filename]) {
    return runtimeStore[filename] as T;
  }

  // Save initial fallback to disk
  try {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
  } catch {}

  runtimeStore[filename] = defaultData;
  return defaultData;
}

export function saveCollection<T = any>(filename: string, data: T): void {
  runtimeStore[filename] = data;
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename} to disk:`, err);
  }
}
