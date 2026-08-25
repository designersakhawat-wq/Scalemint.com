import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", InvoiceController.getAll);
router.get("/:id", InvoiceController.getById);
router.post("/", authenticate, InvoiceController.create);
router.put("/:id", authenticate, InvoiceController.update);
router.delete("/:id", authenticate, InvoiceController.delete);

export default router;
