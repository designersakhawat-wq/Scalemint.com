"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = exports.BlogService = void 0;
const prisma_1 = require("../config/prisma");
const appError_1 = require("../utils/appError");
const initialData_1 = require("../config/initialData");
const fileStore_1 = require("../utils/fileStore");
const BLOGS_FILE = "blogs.json";
class BlogService {
    async getAllBlogs(options = {}) {
        const { page = 1, limit = 10, category, tag, search, onlyPublished = true } = options;
        let blogs = (0, fileStore_1.loadData)(BLOGS_FILE, initialData_1.initialBlogs);
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
    async getBlogBySlug(slug) {
        const blogs = (0, fileStore_1.loadData)(BLOGS_FILE, initialData_1.initialBlogs);
        const blog = blogs.find((b) => b.slug === slug || b.id === slug);
        if (!blog)
            throw appError_1.AppError.notFound(`Blog post with slug '${slug}' not found`);
        // Increment views
        blog.views = (blog.views || 0) + 1;
        (0, fileStore_1.saveData)(BLOGS_FILE, blogs);
        return blog;
    }
    async createBlog(data, authorId) {
        const blogs = (0, fileStore_1.loadData)(BLOGS_FILE, initialData_1.initialBlogs);
        const slug = data.slug ||
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
        (0, fileStore_1.saveData)(BLOGS_FILE, blogs);
        try {
            await prisma_1.prisma.blogPost.create({ data: newBlog });
        }
        catch { }
        return newBlog;
    }
    async updateBlog(id, data) {
        const blogs = (0, fileStore_1.loadData)(BLOGS_FILE, initialData_1.initialBlogs);
        const idx = blogs.findIndex((b) => b.id === id || b.slug === id);
        if (idx === -1)
            throw appError_1.AppError.notFound("Blog post not found");
        if (data.title && !data.slug) {
            data.slug = data.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
        }
        blogs[idx] = { ...blogs[idx], ...data };
        (0, fileStore_1.saveData)(BLOGS_FILE, blogs);
        try {
            await prisma_1.prisma.blogPost.update({
                where: { id: blogs[idx].id },
                data: data,
            });
        }
        catch { }
        return blogs[idx];
    }
    async deleteBlog(id) {
        const blogs = (0, fileStore_1.loadData)(BLOGS_FILE, initialData_1.initialBlogs);
        const filtered = blogs.filter((b) => b.id !== id && b.slug !== id);
        (0, fileStore_1.saveData)(BLOGS_FILE, filtered);
        try {
            await prisma_1.prisma.blogPost.delete({
                where: { id },
            });
        }
        catch { }
        return { id };
    }
}
exports.BlogService = BlogService;
exports.blogService = new BlogService();
//# sourceMappingURL=blog.service.js.map