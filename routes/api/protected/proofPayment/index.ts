import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addproofPaymentController,
  deleteProofPaymentController,
  editProofPaymentController,
  getAllByIdCourseFileController,
  getAllCourseFileController,
  getByIdCourseFileController,
  getCurrentDataProofPayment,
} from "../../../../controller/protected/proofPayment";
import multerFile from "../../../../config/multerFile";
import { addProofPaymentValidator } from "../../../../utils/validator";

const router = express.Router();

router.post(
  "/",
  multerFile.single("file"),
  addProofPaymentValidator,
  errorHandler(addproofPaymentController)
);
router.put(
  "/:id",
  multerFile.single("file"),
  errorHandler(editProofPaymentController)
);
router.delete("/:id", errorHandler(deleteProofPaymentController));
router.get("/", errorHandler(getAllCourseFileController));
router.get("/current", errorHandler(getCurrentDataProofPayment));

router.get("/all/:id", errorHandler(getAllByIdCourseFileController));
router.get("/:id", errorHandler(getByIdCourseFileController));

export default router;
