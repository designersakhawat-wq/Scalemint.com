"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const blog_validator_1 = require("../validators/blog.validator");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Public routes
router.get("/", blog_controller_1.blogController.getAllBlogs);
router.get("/:slug", blog_controller_1.blogController.getBlogBySlug);
// Admin routes
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(blog_validator_1.createBlogSchema), blog_controller_1.blogController.createBlog);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), (0, validate_middleware_1.validate)(blog_validator_1.updateBlogSchema), blog_controller_1.blogController.updateBlog);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(client_1.Role.ADMIN), blog_controller_1.blogController.deleteBlog);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map