import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addBatchValidator,
  addCourseValidator,
  editBatchValidator,
} from "../../../../utils/validator";
import {
  addBatchController,
  deleteBatchController,
  editBatchController,
  getAllBatchController,
  getByIdBatchController,
  searchBatchController,
} from "../../../../controller/protected/batch";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  multerFile.single("image"),
  addBatchValidator,
  errorHandler(addBatchController)
);
router.get("/search", errorHandler(searchBatchController));
router.put(
  "/:id",
  multerFile.single("image"),
  editBatchValidator,
  errorHandler(editBatchController)
);
router.delete("/:id", errorHandler(deleteBatchController));
router.get("/", errorHandler(getAllBatchController));
router.get("/:id", errorHandler(getByIdBatchController));

export default router;
