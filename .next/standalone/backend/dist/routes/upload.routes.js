"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
// Upload route with direct multer handling for admin media assets
router.post("/", multer_1.upload.single("file"), upload_controller_1.uploadController.uploadFile);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map