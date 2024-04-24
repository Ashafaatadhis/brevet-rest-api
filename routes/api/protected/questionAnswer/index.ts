import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addQuestionAnswerController,
  editQuestionAnswerController,
  getAllByIdQuestionAnswerController,
  getAllQuestionAnswerController,
  getByIdQuestionAnswerController,
  deleteQuestionAnswerController,
} from "../../../../controller/protected/questionAnswer";
import { addQuestionAnswerValidator } from "../../../../utils/validator";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  // multerFile.array("file", 10),
  addQuestionAnswerValidator,
  errorHandler(addQuestionAnswerController)
);
router.put(
  "/:id",
  addQuestionAnswerValidator,
  errorHandler(editQuestionAnswerController)
);
router.delete("/:id", errorHandler(deleteQuestionAnswerController));
router.get("/", errorHandler(getAllQuestionAnswerController));
router.get("/:id", errorHandler(getByIdQuestionAnswerController));

export default router;
