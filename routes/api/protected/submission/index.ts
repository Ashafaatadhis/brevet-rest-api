import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addSubmissionController,
  deleteSubmissionController,
  editSubmissionController,
  getAllByIdSubmissionController,
  getAllSubmissionController,
  getByIdSubmissionController,
} from "../../../../controller/protected/submission";
import { addCourseValidator } from "../../../../utils/validator";
const router = express.Router();

router.post("/", addCourseValidator, errorHandler(addSubmissionController));
router.put("/:id", addCourseValidator, errorHandler(editSubmissionController));
router.delete("/:id", errorHandler(deleteSubmissionController));
router.get("/", errorHandler(getAllByIdSubmissionController));
router.get("/:id", errorHandler(getByIdSubmissionController));

export default router;
