import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";

const router = Router();

// GET /api/v1/settings (Public - used by frontend to fetch theme, logo, contact info)
router.get("/", settingsController.getSettings);

// PUT /api/v1/settings (Admin site customizer)
router.put("/", settingsController.updateSettings);

export default router;
