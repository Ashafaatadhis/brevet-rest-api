import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addCourseController,
  deleteCourseController,
  editCourseController,
  getAllCourseController,
  getByIdCourseController,
} from "../../../../controller/protected/course";
import { addCourseValidator } from "../../../../utils/validator";
const router = express.Router();

router.post("/", addCourseValidator, errorHandler(addCourseController));
router.put("/:id", addCourseValidator, errorHandler(editCourseController));
router.delete("/:id", errorHandler(deleteCourseController));
router.get("/", errorHandler(getAllCourseController));
router.get("/:id", errorHandler(getByIdCourseController));

export default router;
