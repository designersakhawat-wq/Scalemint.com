import { Request, Response, NextFunction } from "express";
import { blogService } from "../services/blog.service";
import { ApiResponse } from "../utils/apiResponse";

export class BlogController {
  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const all = req.query.all === "true";

      const { items, meta } = await blogService.getAllBlogs({
        page,
        limit,
        category,
        search,
        onlyPublished: !all,
      });

      return ApiResponse.success(res, items, "Blogs retrieved successfully", 200, meta);
    } catch (error) {
      next(error);
    }
  }

  async getBlogBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogService.getBlogBySlug(req.params.slug);
      return ApiResponse.success(res, blog, "Blog post retrieved");
    } catch (error) {
      next(error);
    }
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogService.createBlog(req.body);
      return ApiResponse.created(res, blog, "Blog post created successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogService.updateBlog(req.params.id, req.body);
      return ApiResponse.success(res, blog, "Blog post updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      await blogService.deleteBlog(req.params.id);
      return ApiResponse.success(res, null, "Blog post deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export const blogController = new BlogController();
