"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_controller_1 = require("../controllers/faq.controller");
const router = (0, express_1.Router)();
// Full FAQ CRUD
router.get("/", faq_controller_1.faqController.getAllFaqs);
router.get("/:id", faq_controller_1.faqController.getFaqById);
router.post("/", faq_controller_1.faqController.createFaq);
router.put("/:id", faq_controller_1.faqController.updateFaq);
router.delete("/:id", faq_controller_1.faqController.deleteFaq);
exports.default = router;
//# sourceMappingURL=faq.routes.js.map