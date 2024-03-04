import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

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
  getByIdController,
} from "../../../../controller/protected/user";
import HttpError from "../../../../utils/errors/HttpError";
import { check } from "express-validator";
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
  "/:id",
  multer.single("image"),
  updateValidator,
  errorHandler(editByIdController)
);
router.get("/:id", errorHandler(getByIdController));
router.get("/", errorHandler(getAllController));
router.put(
  "/change-password/:id",
  changePasswordValidator,
  errorHandler(changePasswordByIdController)
);

export default router;
