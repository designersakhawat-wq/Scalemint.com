import { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import { upload } from "../config/multer";

const router = Router();

// Upload route with direct multer handling for admin media assets
router.post(
  "/",
  upload.single("file"),
  uploadController.uploadFile
);

export default router;
