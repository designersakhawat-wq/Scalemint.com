import { prisma } from "../config/prisma";
import { AppError } from "../utils/appError";
import { initialBlogs } from "../config/initialData";
import { loadData, saveData } from "../utils/fileStore";

const BLOGS_FILE = "blogs.json";

export class BlogService {
  async getAllBlogs(options: { page?: number; limit?: number; category?: string; tag?: string; search?: string; onlyPublished?: boolean } = {}) {
    const { page = 1, limit = 10, category, tag, search, onlyPublished = true } = options;
    let blogs = loadData<any[]>(BLOGS_FILE, initialBlogs);

    if (onlyPublished) {
      blogs = blogs.filter((b) => b.isPublished !== false);
    }
    if (category) {
      blogs = blogs.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      blogs = blogs.filter((b) => (b.tags || []).includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      blogs = blogs.filter((b) => b.title?.toLowerCase().includes(q) || b.content?.toLowerCase().includes(q));
    }

    const total = blogs.length;
    const startIndex = (page - 1) * limit;
    const items = blogs.slice(startIndex, startIndex + limit);
    const pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    return {
      items,
      pagination,
      meta: pagination,
    };
  }

  async getBlogBySlug(slug: string) {
    const blogs = loadData<any[]>(BLOGS_FILE, initialBlogs);
    const blog = blogs.find((b) => b.slug === slug || b.id === slug);
    if (!blog) throw AppError.notFound(`Blog post with slug '${slug}' not found`);

    // Increment views
    blog.views = (blog.views || 0) + 1;
    saveData(BLOGS_FILE, blogs);

    return blog;
  }

  async createBlog(data: any, authorId?: string) {
    const blogs = loadData<any[]>(BLOGS_FILE, initialBlogs);
    const slug =
      data.slug ||
      (data.title
        ? data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
        : `blog-${Date.now()}`);

    const newBlog = {
      id: data.id || `blog_${Date.now()}`,
      slug,
      ...data,
      authorId: authorId || "admin_1",
      views: 0,
      isPublished: data.isPublished ?? true,
      publishedAt: data.publishedAt || new Date().toISOString(),
    };
    blogs.unshift(newBlog);
    saveData(BLOGS_FILE, blogs);

    try {
      await prisma.blogPost.create({ data: newBlog as any });
    } catch {}

    return newBlog;
  }

  async updateBlog(id: string, data: any) {
    const blogs = loadData<any[]>(BLOGS_FILE, initialBlogs);
    const idx = blogs.findIndex((b) => b.id === id || b.slug === id);
    if (idx === -1) throw AppError.notFound("Blog post not found");

    if (data.title && !data.slug) {
      data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    }

    blogs[idx] = { ...blogs[idx], ...data };
    saveData(BLOGS_FILE, blogs);

    try {
      await prisma.blogPost.update({
        where: { id: blogs[idx].id },
        data: data as any,
      });
    } catch {}

    return blogs[idx];
  }

  async deleteBlog(id: string) {
    const blogs = loadData<any[]>(BLOGS_FILE, initialBlogs);
    const filtered = blogs.filter((b) => b.id !== id && b.slug !== id);
    saveData(BLOGS_FILE, filtered);

    try {
      await prisma.blogPost.delete({
        where: { id },
      });
    } catch {}

    return { id };
  }
}

export const blogService = new BlogService();
