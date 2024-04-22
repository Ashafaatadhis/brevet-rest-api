import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addCourseTaskFileController,
  deleteCourseTaskFileController,
  editCourseTaskFileController,
  getAllByIdCourseTaskFileController,
  getAllCourseTaskFileController,
  getByIdCourseTaskFileController,
} from "../../../../controller/protected/courseTaskFile";
import multerFile from "../../../../config/multerFile";
import { addCourseTaskFileValidator } from "../../../../utils/validator";

const router = express.Router();

router.post(
  "/",
  multerFile.array("file", 10),
  addCourseTaskFileValidator,
  errorHandler(addCourseTaskFileController)
);
router.put(
  "/:id",
  multerFile.single("file"),
  errorHandler(editCourseTaskFileController)
);
router.delete("/:id", errorHandler(deleteCourseTaskFileController));
router.get("/", errorHandler(getAllCourseTaskFileController));
router.get("/all/:id", errorHandler(getAllByIdCourseTaskFileController));
router.get("/:id", errorHandler(getByIdCourseTaskFileController));

export default router;
