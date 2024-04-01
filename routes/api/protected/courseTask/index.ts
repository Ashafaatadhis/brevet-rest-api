import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import { addCourseTaskValidator } from "../../../../utils/validator";
import {
  addCourseTaskController,
  deleteCourseTaskController,
  editCourseTaskController,
  getAllCourseTaskController,
  getByIdCourseTaskController,
} from "../../../../controller/protected/courseTask";
const router = express.Router();

router.post("/", addCourseTaskValidator, errorHandler(addCourseTaskController));
router.put(
  "/:id",
  // addCourseTaskValidator,
  errorHandler(editCourseTaskController)
);
router.delete("/:id", errorHandler(deleteCourseTaskController));
router.get("/", errorHandler(getAllCourseTaskController));
router.get("/:id", errorHandler(getByIdCourseTaskController));

export default router;
