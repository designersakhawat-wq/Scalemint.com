"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = exports.BlogController = void 0;
const blog_service_1 = require("../services/blog.service");
const apiResponse_1 = require("../utils/apiResponse");
class BlogController {
    async getAllBlogs(req, res, next) {
        try {
            const page = req.query.page ? parseInt(req.query.page, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
            const category = req.query.category;
            const search = req.query.search;
            const all = req.query.all === "true";
            const { items, meta } = await blog_service_1.blogService.getAllBlogs({
                page,
                limit,
                category,
                search,
                onlyPublished: !all,
            });
            return apiResponse_1.ApiResponse.success(res, items, "Blogs retrieved successfully", 200, meta);
        }
        catch (error) {
            next(error);
        }
    }
    async getBlogBySlug(req, res, next) {
        try {
            const blog = await blog_service_1.blogService.getBlogBySlug(req.params.slug);
            return apiResponse_1.ApiResponse.success(res, blog, "Blog post retrieved");
        }
        catch (error) {
            next(error);
        }
    }
    async createBlog(req, res, next) {
        try {
            const blog = await blog_service_1.blogService.createBlog(req.body);
            return apiResponse_1.ApiResponse.created(res, blog, "Blog post created successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const blog = await blog_service_1.blogService.updateBlog(req.params.id, req.body);
            return apiResponse_1.ApiResponse.success(res, blog, "Blog post updated successfully");
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBlog(req, res, next) {
        try {
            await blog_service_1.blogService.deleteBlog(req.params.id);
            return apiResponse_1.ApiResponse.success(res, null, "Blog post deleted successfully");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BlogController = BlogController;
exports.blogController = new BlogController();
//# sourceMappingURL=blog.controller.js.map