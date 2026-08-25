import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCollection, saveCollection } from "@/lib/serverStore";
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

// Helper to extract segments from [...route]
function getSegments(params: { route?: string[] } | undefined): string[] {
  return params?.route || [];
}

function cleanSettingsData(settings: any) {
  try {
    if (!settings || typeof settings !== "object") return defaultSettings;
    const defaultImages = defaultSettings.images || {};
    const defaultCarousel = defaultImages.heroCarousel || [];

    const rawCarousel = Array.isArray(settings.images?.heroCarousel) && settings.images.heroCarousel.length > 0
      ? settings.images.heroCarousel
      : defaultCarousel;

    const cleanedCarousel = rawCarousel.map((item: any, idx: number) => {
      let u = (item?.url || "").trim();
      const fallbackUrl = defaultCarousel[idx % defaultCarousel.length]?.url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
      if (!u || u.startsWith("blob:") || u.includes("localhost:5000") || u.includes("localhost:3000") || u.length < 5) {
        u = fallbackUrl;
      }
      return {
        id: item?.id || `c_${idx + 1}`,
        title: item?.title || defaultCarousel[idx % defaultCarousel.length]?.title || `Project #${idx + 1}`,
        url: u,
        position: item?.position || "center",
      };
    });

    const rawIndustry = settings.images?.industryCards || defaultImages.industryCards || {};
    const rawLogos = Array.isArray(settings.images?.clientLogos) ? settings.images.clientLogos : (defaultImages.clientLogos || []);

    return {
      ...defaultSettings,
      ...settings,
      navbarMenu: {
        ...defaultSettings.navbarMenu,
        ...(settings.navbarMenu || {}),
        servicesDropdown: {
          ...defaultSettings.navbarMenu?.servicesDropdown,
          ...(settings.navbarMenu?.servicesDropdown || {}),
          items: Array.isArray(settings.navbarMenu?.servicesDropdown?.items)
            ? settings.navbarMenu.servicesDropdown.items
            : defaultSettings.navbarMenu?.servicesDropdown?.items || [],
        },
      },
      footerConfig: {
        ...defaultSettings.footerConfig,
        ...(settings.footerConfig || {}),
      },
      carouselConfig: {
        ...defaultSettings.carouselConfig,
        ...(settings.carouselConfig || {}),
      },
      faqSection: {
        ...defaultSettings.faqSection,
        ...(settings.faqSection || {}),
      },
      legalPages: {
        ...defaultSettings.legalPages,
        ...(settings.legalPages || {}),
      },
      images: {
        ...defaultImages,
        ...(settings.images || {}),
        heroCarousel: cleanedCarousel,
        industryCards: {
          ...defaultImages.industryCards,
          ...(rawIndustry || {}),
        },
        clientLogos: rawLogos,
      },
    };
  } catch (err) {
    console.error("Error in cleanSettingsData:", err);
    return defaultSettings;
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ route: string[] }> }
) {
  const params = await context.params;
  const segments = getSegments(params);
  const resource = segments[0]?.toLowerCase();
  const idOrSlug = segments[1];

  // Health check
  if (resource === "health") {
    return NextResponse.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "Scaleminte Next.js Native API v1",
    });
  }

  // Uploads Stream
  if (resource === "uploads" && idOrSlug) {
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, idOrSlug);
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const ext = path.extname(idOrSlug).toLowerCase();
        const contentType =
          ext === ".png"
            ? "image/png"
            : ext === ".svg"
            ? "image/svg+xml"
            : ext === ".webp"
            ? "image/webp"
            : "image/jpeg";
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {}
    return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
  }

  // Dashboard Stats
  if (resource === "admin" && idOrSlug === "dashboard") {
    const services = getCollection("services.json", initialServices);
    const blogs = getCollection("blogs.json", initialBlogs);
    const portfolio = getCollection("portfolio.json", initialPortfolio);
    const packages = getCollection("packages.json", initialPackages);
    const team = getCollection("team.json", initialTeam);
    const faqs = getCollection("faqs.json", initialFaqs);
    const invoices = getCollection("invoices.json", initialInvoices);
    const contacts = getCollection("contacts.json", []);

    return NextResponse.json({
      success: true,
      data: {
        servicesCount: services.length,
        blogsCount: blogs.length,
        portfolioCount: portfolio.length,
        packagesCount: packages.length,
        teamCount: team.length,
        faqsCount: faqs.length,
        invoicesCount: invoices.length,
        contactsCount: contacts.length,
      },
    });
  }

  // Team
  if (resource === "team") {
    const team = getCollection("team.json", initialTeam);
    if (idOrSlug) {
      const member = team.find((m: any) => m.slug === idOrSlug || m.id === idOrSlug);
      if (!member) {
        return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: member });
    }
    return NextResponse.json({ success: true, data: team });
  }

  // Blogs
  if (resource === "blogs") {
    const blogs = getCollection("blogs.json", initialBlogs);
    if (idOrSlug) {
      const blog = blogs.find((b: any) => b.slug === idOrSlug || b.id === idOrSlug);
      if (!blog) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: blog });
    }
    return NextResponse.json({ success: true, data: { items: blogs, total: blogs.length } });
  }

  // Services
  if (resource === "services") {
    const services = getCollection("services.json", initialServices);
    if (idOrSlug) {
      const srv = services.find((s: any) => s.slug === idOrSlug || s.id === idOrSlug);
      if (!srv) {
        return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: srv });
    }
    return NextResponse.json({ success: true, data: services });
  }

  // Portfolio
  if (resource === "portfolio") {
    const portfolio = getCollection("portfolio.json", initialPortfolio);
    if (idOrSlug) {
      const port = portfolio.find((p: any) => p.slug === idOrSlug || p.id === idOrSlug);
      if (!port) {
        return NextResponse.json({ success: false, message: "Portfolio item not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: port });
    }
    return NextResponse.json({ success: true, data: portfolio });
  }

  // Packages
  if (resource === "packages") {
    const packages = getCollection("packages.json", initialPackages);
    if (idOrSlug) {
      const pkg = packages.find((p: any) => p.id === idOrSlug || p.slug === idOrSlug);
      if (!pkg) {
        return NextResponse.json({ success: false, message: "Package not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: pkg });
    }
    return NextResponse.json({ success: true, data: packages });
  }

  // FAQs
  if (resource === "faqs") {
    const faqs = getCollection("faqs.json", initialFaqs);
    if (idOrSlug) {
      const faq = faqs.find((f: any) => f.id === idOrSlug);
      if (!faq) {
        return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: faq });
    }
    return NextResponse.json({ success: true, data: faqs });
  }

  // Invoices
  if (resource === "invoices") {
    const invoices = getCollection("invoices.json", initialInvoices);
    if (idOrSlug) {
      const inv = invoices.find((i: any) => i.id === idOrSlug || i.invoiceNumber === idOrSlug);
      if (!inv) {
        return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: inv });
    }
    return NextResponse.json({ success: true, data: invoices });
  }

  // Settings / Site Config
  if (resource === "settings" || resource === "site-config") {
    const raw = getCollection("settings.json", defaultSettings);
    const settings = cleanSettingsData(raw);
    return NextResponse.json({ success: true, data: settings });
  }

  // Contacts
  if (resource === "contact") {
    const contacts = getCollection("contacts.json", []);
    return NextResponse.json({ success: true, data: contacts });
  }

  // Auth Me
  if (resource === "auth" && idOrSlug === "me") {
    return NextResponse.json({
      success: true,
      data: {
        id: "usr_admin",
        name: "Scaleminte Admin",
        email: "admin@scaleminte.com",
        role: "ADMIN",
      },
    });
  }

  // Fallback API welcome
  return NextResponse.json({
    success: true,
    message: "Welcome to Scaleminte Native API v1",
    version: "1.0.0",
  });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ route: string[] }> }
) {
  const params = await context.params;
  const segments = getSegments(params);
  const resource = segments[0]?.toLowerCase();
  const subAction = segments[1]?.toLowerCase();

  // Auth Login
  if (resource === "auth" && subAction === "login") {
    try {
      const body = await req.json();
      const { email, password } = body || {};
      if (email === "admin@scaleminte.com" && password === "Admin@123456") {
        return NextResponse.json({
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: "usr_admin",
              name: "Scaleminte Admin",
              email: "admin@scaleminte.com",
              role: "ADMIN",
            },
            accessToken: "scaleminte_secure_token_" + Date.now(),
          },
        });
      }
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    } catch {
      return NextResponse.json({ success: false, message: "Bad Request" }, { status: 400 });
    }
  }

  // Uploads
  if (resource === "uploads") {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean file extension & safe filename
      const originalExt = path.extname(file.name) || "";
      const ext = originalExt ? originalExt.toLowerCase() : file.type?.includes("png") ? ".png" : file.type?.includes("svg") ? ".svg" : file.type?.includes("webp") ? ".webp" : ".jpg";
      const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;

      // 1. Ensure public/uploads directory exists
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, safeName), buffer);

      // 2. Also write to standalone directory if running in standalone
      const standaloneUploadDir = path.join(process.cwd(), ".next", "standalone", "public", "uploads");
      if (fs.existsSync(path.dirname(standaloneUploadDir))) {
        if (!fs.existsSync(standaloneUploadDir)) {
          fs.mkdirSync(standaloneUploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(standaloneUploadDir, safeName), buffer);
      }

      const fileUrl = `/uploads/${safeName}`;

      return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        data: { url: fileUrl, name: safeName, size: file.size },
      });
    } catch (err) {
      console.error("Upload error:", err);
      return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
  }

  // Create Team Member
  if (resource === "team") {
    const body = await req.json();
    const team = getCollection<any[]>("team.json", initialTeam);
    const newMember = {
      ...body,
      id: body.id || `team_${Date.now()}`,
      slug: body.slug || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `member-${Date.now()}`,
      isActive: body.isActive ?? true,
      order: body.order ?? team.length + 1,
    };
    const updated = [...team, newMember];
    saveCollection("team.json", updated);
    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  }

  // Create Blog
  if (resource === "blogs") {
    const body = await req.json();
    const blogs = getCollection<any[]>("blogs.json", initialBlogs);
    const newBlog = {
      ...body,
      id: body.id || `blog_${Date.now()}`,
      slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `blog-${Date.now()}`,
      publishedAt: body.publishedAt || new Date().toISOString(),
      views: body.views || 0,
      isPublished: body.isPublished ?? true,
    };
    const updated = [newBlog, ...blogs];
    saveCollection("blogs.json", updated);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  }

  // Create Service
  if (resource === "services") {
    const body = await req.json();
    const services = getCollection<any[]>("services.json", initialServices);
    const newService = {
      ...body,
      id: body.id || `srv_${Date.now()}`,
      slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `service-${Date.now()}`,
      isActive: body.isActive ?? true,
      order: body.order ?? services.length + 1,
    };
    const updated = [...services, newService];
    saveCollection("services.json", updated);
    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  }

  // Create Portfolio
  if (resource === "portfolio") {
    const body = await req.json();
    const portfolio = getCollection<any[]>("portfolio.json", initialPortfolio);
    const newPort = {
      ...body,
      id: body.id || `port_${Date.now()}`,
      slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `portfolio-${Date.now()}`,
      order: body.order ?? portfolio.length + 1,
    };
    const updated = [newPort, ...portfolio];
    saveCollection("portfolio.json", updated);
    return NextResponse.json({ success: true, data: newPort }, { status: 201 });
  }

  // Create Package
  if (resource === "packages") {
    const body = await req.json();
    const packages = getCollection<any[]>("packages.json", initialPackages);
    const newPkg = {
      ...body,
      id: body.id || `pkg_${Date.now()}`,
      order: body.order ?? packages.length + 1,
      isActive: body.isActive ?? true,
    };
    const updated = [...packages, newPkg];
    saveCollection("packages.json", updated);
    return NextResponse.json({ success: true, data: newPkg }, { status: 201 });
  }

  // Create FAQ
  if (resource === "faqs") {
    const body = await req.json();
    const faqs = getCollection<any[]>("faqs.json", initialFaqs);
    const newFaq = {
      ...body,
      id: body.id || `faq_${Date.now()}`,
      order: body.order ?? faqs.length + 1,
      isActive: body.isActive ?? true,
    };
    const updated = [...faqs, newFaq];
    saveCollection("faqs.json", updated);
    return NextResponse.json({ success: true, data: newFaq }, { status: 201 });
  }

  // Create Invoice
  if (resource === "invoices") {
    const body = await req.json();
    const invoices = getCollection<any[]>("invoices.json", initialInvoices);
    const newInv = {
      ...body,
      id: body.id || `inv_${Date.now()}`,
      invoiceNumber: body.invoiceNumber || `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`,
      issueDate: body.issueDate || new Date().toISOString().split("T")[0],
      dueDate: body.dueDate || new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
      status: body.status || "PENDING",
    };
    const updated = [newInv, ...invoices];
    saveCollection("invoices.json", updated);
    return NextResponse.json({ success: true, data: newInv }, { status: 201 });
  }

  // Create Contact Inquiry
  if (resource === "contact") {
    const body = await req.json();
    const contacts = getCollection<any[]>("contacts.json", []);
    const newContact = {
      ...body,
      id: `cnt_${Date.now()}`,
      status: "UNREAD",
      createdAt: new Date().toISOString(),
    };
    const updated = [newContact, ...contacts];
    saveCollection("contacts.json", updated);
    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  }

  return NextResponse.json({ success: false, message: "Route not found" }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ route: string[] }> }
) {
  const params = await context.params;
  const segments = getSegments(params);
  const resource = segments[0]?.toLowerCase();
  const idOrSlug = segments[1];
  const body = await req.json();

  // Settings
  if (resource === "settings" || resource === "site-config") {
    const existing = getCollection("settings.json", defaultSettings);
    const updated = cleanSettingsData({ ...existing, ...body });
    saveCollection("settings.json", updated);
    return NextResponse.json({ success: true, data: updated });
  }

  // Update Team Member
  if (resource === "team" && idOrSlug) {
    const team = getCollection<any[]>("team.json", initialTeam);
    const idx = team.findIndex((m: any) => m.id === idOrSlug || m.slug === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 });
    }
    team[idx] = { ...team[idx], ...body };
    saveCollection("team.json", team);
    return NextResponse.json({ success: true, data: team[idx] });
  }

  // Update Blog
  if (resource === "blogs" && idOrSlug) {
    const blogs = getCollection<any[]>("blogs.json", initialBlogs);
    const idx = blogs.findIndex((b: any) => b.id === idOrSlug || b.slug === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }
    blogs[idx] = { ...blogs[idx], ...body };
    saveCollection("blogs.json", blogs);
    return NextResponse.json({ success: true, data: blogs[idx] });
  }

  // Update Service
  if (resource === "services" && idOrSlug) {
    const services = getCollection<any[]>("services.json", initialServices);
    const idx = services.findIndex((s: any) => s.id === idOrSlug || s.slug === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    services[idx] = { ...services[idx], ...body };
    saveCollection("services.json", services);
    return NextResponse.json({ success: true, data: services[idx] });
  }

  // Update Portfolio
  if (resource === "portfolio" && idOrSlug) {
    const portfolio = getCollection<any[]>("portfolio.json", initialPortfolio);
    const idx = portfolio.findIndex((p: any) => p.id === idOrSlug || p.slug === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Portfolio item not found" }, { status: 404 });
    }
    portfolio[idx] = { ...portfolio[idx], ...body };
    saveCollection("portfolio.json", portfolio);
    return NextResponse.json({ success: true, data: portfolio[idx] });
  }

  // Update Package
  if (resource === "packages" && idOrSlug) {
    const packages = getCollection<any[]>("packages.json", initialPackages);
    const idx = packages.findIndex((p: any) => p.id === idOrSlug || p.slug === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Package not found" }, { status: 404 });
    }
    packages[idx] = { ...packages[idx], ...body };
    saveCollection("packages.json", packages);
    return NextResponse.json({ success: true, data: packages[idx] });
  }

  // Update FAQ
  if (resource === "faqs" && idOrSlug) {
    const faqs = getCollection<any[]>("faqs.json", initialFaqs);
    const idx = faqs.findIndex((f: any) => f.id === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }
    faqs[idx] = { ...faqs[idx], ...body };
    saveCollection("faqs.json", faqs);
    return NextResponse.json({ success: true, data: faqs[idx] });
  }

  // Update Invoice
  if (resource === "invoices" && idOrSlug) {
    const invoices = getCollection<any[]>("invoices.json", initialInvoices);
    const idx = invoices.findIndex((i: any) => i.id === idOrSlug || i.invoiceNumber === idOrSlug);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }
    invoices[idx] = { ...invoices[idx], ...body };
    saveCollection("invoices.json", invoices);
    return NextResponse.json({ success: true, data: invoices[idx] });
  }

  return NextResponse.json({ success: false, message: "Route not found" }, { status: 404 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ route: string[] }> }
) {
  const params = await context.params;
  const segments = getSegments(params);
  const resource = segments[0]?.toLowerCase();
  const idOrSlug = segments[1];

  if (!idOrSlug) {
    return NextResponse.json({ success: false, message: "Missing item ID" }, { status: 400 });
  }

  // Delete Team Member
  if (resource === "team") {
    const team = getCollection<any[]>("team.json", initialTeam);
    const updated = team.filter((m: any) => m.id !== idOrSlug && m.slug !== idOrSlug);
    saveCollection("team.json", updated);
    return NextResponse.json({ success: true, message: "Team member deleted successfully", data: updated });
  }

  // Delete Blog
  if (resource === "blogs") {
    const blogs = getCollection<any[]>("blogs.json", initialBlogs);
    const updated = blogs.filter((b: any) => b.id !== idOrSlug && b.slug !== idOrSlug);
    saveCollection("blogs.json", updated);
    return NextResponse.json({ success: true, message: "Blog deleted successfully", data: updated });
  }

  // Delete Service
  if (resource === "services") {
    const services = getCollection<any[]>("services.json", initialServices);
    const updated = services.filter((s: any) => s.id !== idOrSlug && s.slug !== idOrSlug);
    saveCollection("services.json", updated);
    return NextResponse.json({ success: true, message: "Service deleted successfully", data: updated });
  }

  // Delete Portfolio
  if (resource === "portfolio") {
    const portfolio = getCollection<any[]>("portfolio.json", initialPortfolio);
    const updated = portfolio.filter((p: any) => p.id !== idOrSlug && p.slug !== idOrSlug);
    saveCollection("portfolio.json", updated);
    return NextResponse.json({ success: true, message: "Portfolio item deleted successfully", data: updated });
  }

  // Delete Package
  if (resource === "packages") {
    const packages = getCollection<any[]>("packages.json", initialPackages);
    const updated = packages.filter((p: any) => p.id !== idOrSlug && p.slug !== idOrSlug);
    saveCollection("packages.json", updated);
    return NextResponse.json({ success: true, message: "Package deleted successfully", data: updated });
  }

  // Delete FAQ
  if (resource === "faqs") {
    const faqs = getCollection<any[]>("faqs.json", initialFaqs);
    const updated = faqs.filter((f: any) => f.id !== idOrSlug);
    saveCollection("faqs.json", updated);
    return NextResponse.json({ success: true, message: "FAQ deleted successfully", data: updated });
  }

  // Delete Invoice
  if (resource === "invoices") {
    const invoices = getCollection<any[]>("invoices.json", initialInvoices);
    const updated = invoices.filter((i: any) => i.id !== idOrSlug && i.invoiceNumber !== idOrSlug);
    saveCollection("invoices.json", updated);
    return NextResponse.json({ success: true, message: "Invoice deleted successfully", data: updated });
  }

  return NextResponse.json({ success: false, message: "Route not found" }, { status: 404 });
}
