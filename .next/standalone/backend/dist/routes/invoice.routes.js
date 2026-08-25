"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoice_controller_1 = require("../controllers/invoice.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", invoice_controller_1.InvoiceController.getAll);
router.get("/:id", invoice_controller_1.InvoiceController.getById);
router.post("/", auth_middleware_1.authenticate, invoice_controller_1.InvoiceController.create);
router.put("/:id", auth_middleware_1.authenticate, invoice_controller_1.InvoiceController.update);
router.delete("/:id", auth_middleware_1.authenticate, invoice_controller_1.InvoiceController.delete);
exports.default = router;
//# sourceMappingURL=invoice.routes.js.map