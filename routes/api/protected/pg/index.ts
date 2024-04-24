import express from "express";
import errorHandler from "../../../../middleware/errorHandler";
import {
  addPGController,
  deletePGController,
  editPGController,
  getAllByIdPGController,
  getAllPGController,
  getByIdPGController,
} from "../../../../controller/protected/pg";
import { addPGValidator } from "../../../../utils/validator";
import multerFile from "../../../../config/multerFile";
const router = express.Router();

router.post(
  "/",
  // multerFile.array("file", 10),
  addPGValidator,
  errorHandler(addPGController)
);
router.put("/:id", addPGValidator, errorHandler(editPGController));
router.delete("/:id", errorHandler(deletePGController));
router.get("/", errorHandler(getAllPGController));
router.get("/:id", errorHandler(getByIdPGController));

export default router;
