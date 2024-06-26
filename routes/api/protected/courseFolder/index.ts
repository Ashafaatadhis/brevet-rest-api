import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import { addCourseFolderValidator } from "../../../../utils/validator";
import {
  addCourseFolderController,
  deleteCourseFolderController,
  editCourseFolderController,
  getAllByIdCourseFolderController,
  getAllCourseFolderController,
  getByIdCourseFolderController,
} from "../../../../controller/protected/courseFolder";
import getCurrentCourseFolder from "../../../../controller/protected/courseFolder/getCurrentCourseFolder";
const router = express.Router();

router.post(
  "/",
  addCourseFolderValidator,
  errorHandler(addCourseFolderController)
);
router.put(
  "/:id",
  addCourseFolderValidator,
  errorHandler(editCourseFolderController)
);
router.delete("/:id", errorHandler(deleteCourseFolderController));
router.get("/", errorHandler(getAllCourseFolderController));
router.get("/current", errorHandler(getCurrentCourseFolder));
router.get("/:id", errorHandler(getByIdCourseFolderController));
router.get("/all/:id", errorHandler(getAllByIdCourseFolderController));

export default router;
