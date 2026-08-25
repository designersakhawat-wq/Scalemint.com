import { Router } from "express";
import { faqController } from "../controllers/faq.controller";

const router = Router();

// Full FAQ CRUD
router.get("/", faqController.getAllFaqs);
router.get("/:id", faqController.getFaqById);
router.post("/", faqController.createFaq);
router.put("/:id", faqController.updateFaq);
router.delete("/:id", faqController.deleteFaq);

export default router;
