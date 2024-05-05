import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addPaymentValidator,
  editPaymentValidator,
} from "../../../../utils/validator";
import {
  addPaymentController,
  deletePaymentController,
  editPaymentController,
  getAllPaymentController,
  getByIdPaymentController,
} from "../../../../controller/protected/payment";
import multer from "../../../../config/multer";
const router = express.Router();

router.post(
  "/",
  multer.single("bukti_bayar"),
  addPaymentValidator,
  errorHandler(addPaymentController)
);
router.put(
  "/:id",
  multer.single("bukti_bayar"),
  editPaymentValidator,
  errorHandler(editPaymentController)
);
router.delete("/:id", errorHandler(deletePaymentController));
router.get("/", errorHandler(getAllPaymentController));
router.get("/:id", errorHandler(getByIdPaymentController));

export default router;
