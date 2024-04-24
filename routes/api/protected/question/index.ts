import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addQuestionController,
  deleteQuestionController,
  editQuestionController,
  getAllByIdQuestionController,
  getAllQuestionController,
  getByIdQuestionController,
} from "../../../../controller/protected/question";
import { addQuestionValidator } from "../../../../utils/validator";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  // multerFile.array("file", 10),
  addQuestionValidator,
  errorHandler(addQuestionController)
);
router.put("/:id", addQuestionValidator, errorHandler(editQuestionController));
router.delete("/:id", errorHandler(deleteQuestionController));
router.get("/", errorHandler(getAllQuestionController));
router.get("/:id", errorHandler(getByIdQuestionController));

export default router;
