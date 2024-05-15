import {
  changePasswordValidator,
  updateValidator,
} from "../../../../utils/validator";

import errorHandler from "../../../../middleware/errorHandler";

import multer from "../../../../config/multer";
import {
  changePasswordByIdController,
  deleteByIdController,
  editByIdController,
  getAllController,
  getBatchController,
  getCurrentUser,
  getByIdController,
  getCoursesController,
} from "../../../../controller/protected/user";

import express from "express";

const router = express.Router();

// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );

router.delete("/:id", errorHandler(deleteByIdController));
router.put(
  "/change-password/:id",
  changePasswordValidator,
  errorHandler(changePasswordByIdController)
);
router.put(
  "/:id",
  multer.single("image"),
  updateValidator,
  errorHandler(editByIdController)
);
router.get("/get-batch", errorHandler(getBatchController));
router.get("/current", errorHandler(getCurrentUser));
router.get("/:id", errorHandler(getByIdController));
router.get(
  "/get-courses/:batchId/:courseId",
  errorHandler(getCoursesController)
);
router.get("/", errorHandler(getAllController));

export default router;
