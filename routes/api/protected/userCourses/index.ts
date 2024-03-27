import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addBatchValidator,
  addCourseValidator,
  addUserCourseValidator,
  editUserCourseValidator,
} from "../../../../utils/validator";
import {
  addUserCoursesController,
  deleteUserCoursesController,
  editUserCoursesController,
  getAllUserCoursesController,
  getByIdUserCoursesController,
} from "../../../../controller/protected/userCourses";
import multer from "../../../../config/multer";
const router = express.Router();

router.post(
  "/",
  multer.single("bukti_bayar"),
  addUserCourseValidator,
  errorHandler(addUserCoursesController)
);
router.put(
  "/:id",
  multer.single("bukti_bayar"),
  editUserCourseValidator,
  errorHandler(editUserCoursesController)
);
router.delete("/:id", errorHandler(deleteUserCoursesController));
router.get("/", errorHandler(getAllUserCoursesController));
router.get("/:id", errorHandler(getByIdUserCoursesController));

export default router;
