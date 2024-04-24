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
import { addSubmissionValidator } from "../../../../utils/validator";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  multerFile.array("file", 10),
  addSubmissionValidator,
  errorHandler(addSubmissionController)
);
router.put(
  "/:id",
  addSubmissionValidator,
  errorHandler(editSubmissionController)
);
router.delete("/:id", errorHandler(deleteSubmissionController));
router.get("/", errorHandler(getAllByIdSubmissionController));
router.get("/:id", errorHandler(getByIdSubmissionController));

export default router;
