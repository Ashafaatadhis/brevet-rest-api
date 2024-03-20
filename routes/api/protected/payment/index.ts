import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addBatchValidator,
  addCourseValidator,
} from "../../../../utils/validator";
import {
  addPaymentController,
  deletePaymentController,
  editPaymentController,
  getAllPaymentController,
  getByIdPaymentController,
} from "../../../../controller/protected/payment";
const router = express.Router();

router.post("/", addBatchValidator, errorHandler(addPaymentController));
router.put("/:id", errorHandler(editPaymentController));
router.delete("/:id", errorHandler(deletePaymentController));
router.get("/", errorHandler(getAllPaymentController));
router.get("/:id", errorHandler(getByIdPaymentController));

export default router;
