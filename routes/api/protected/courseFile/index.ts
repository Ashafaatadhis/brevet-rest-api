import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addCourseFileController,
  deleteCourseFileController,
  editCourseFileController,
  getAllCourseFileController,
  getAllByIdCourseFileController,
  getByIdCourseFileController,
} from "../../../../controller/protected/courseFile";
import multerFile from "../../../../config/multerFile";
import { addCourseFileValidator } from "../../../../utils/validator";

const router = express.Router();

router.post(
  "/",
  multerFile.array("file", 10),
  addCourseFileValidator,
  errorHandler(addCourseFileController)
);
router.put(
  "/:id",
  multerFile.single("file"),
  errorHandler(editCourseFileController)
);
router.delete("/:id", errorHandler(deleteCourseFileController));
router.get("/", errorHandler(getAllCourseFileController));
router.get("/all/:id", errorHandler(getAllByIdCourseFileController));
router.get("/:id", errorHandler(getByIdCourseFileController));

export default router;
