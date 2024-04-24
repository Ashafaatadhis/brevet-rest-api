import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addUserAnswerController,
  deleteUserAnswerController,
  editUserAnswerController,
  getAllByIdUserAnswerController,
  getAllUserAnswerController,
  getByIdUserAnswerController,
} from "../../../../controller/protected/userAnswer";
import { addUserAnswerValidator } from "../../../../utils/validator";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  // multerFile.array("file", 10),
  addUserAnswerValidator,
  errorHandler(addUserAnswerController)
);
router.put(
  "/:id",
  addUserAnswerValidator,
  errorHandler(editUserAnswerController)
);
router.delete("/:id", errorHandler(deleteUserAnswerController));
router.get("/", errorHandler(getAllUserAnswerController));
router.get("/:id", errorHandler(getByIdUserAnswerController));

export default router;
