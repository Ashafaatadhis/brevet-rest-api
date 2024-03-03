import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import { addCourseFolderValidator } from "../../../../utils/validator";
import {
  addCourseFolderController,
  deleteCourseFolderController,
  editCourseFolderController,
  getAllCourseFolderController,
  getByIdCourseFolderController,
} from "../../../../controller/protected/courseFolder";
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
router.get("/:id", errorHandler(getByIdCourseFolderController));

export default router;
