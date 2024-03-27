import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import { addBatchCourseValidator } from "../../../../utils/validator";
import {
  addBatchCourseController,
  deleteBatchCourseController,
  editBatchCourseController,
  getAllBatchCourseController,
  getAllByIdBatchCourseController,
  getByIdBatchCourseController,
} from "../../../../controller/protected/batchCourse";
const router = express.Router();

router.post(
  "/",
  addBatchCourseValidator,
  errorHandler(addBatchCourseController)
);
router.put(
  "/:id",
  addBatchCourseValidator,
  errorHandler(editBatchCourseController)
);
router.delete("/:id", errorHandler(deleteBatchCourseController));
router.get("/all/:id", errorHandler(getAllByIdBatchCourseController));
router.get("/", errorHandler(getAllBatchCourseController));
router.get("/:id", errorHandler(getByIdBatchCourseController));

export default router;
