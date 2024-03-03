import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addBatchValidator,
  addCourseValidator,
} from "../../../../utils/validator";
import {
  addBatchController,
  deleteBatchController,
  editBatchController,
  getAllBatchController,
  getByIdBatchController,
} from "../../../../controller/protected/batch";
const router = express.Router();

router.post("/", addBatchValidator, errorHandler(addBatchController));
router.put("/:id", addBatchValidator, errorHandler(editBatchController));
router.delete("/:id", errorHandler(deleteBatchController));
router.get("/", errorHandler(getAllBatchController));
router.get("/:id", errorHandler(getByIdBatchController));

export default router;
