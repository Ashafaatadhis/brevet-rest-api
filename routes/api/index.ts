import express from "express";
import auth from "./auth";
import protect from "./protected";
import { loginValidator, registerValidator } from "../../utils/validator";

import registerController from "../../controller/auth/local/registerController";
import loginController from "../../controller/auth/local/loginController";
import logoutController from "../../controller/auth/local/logoutController";
import refreshTokenController from "../../controller/auth/local/refreshTokenController";

import errorHandler from "../../middleware/errorHandler";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ message: "Welcome to brevet Rest API" });
});

router.post(
  "/register",
  // multer.single("image"),
  registerValidator,
  errorHandler(registerController)
);
router.post("/login", loginValidator, errorHandler(loginController));
router.post("/refreshToken", errorHandler(refreshTokenController));
router.delete("/logout", errorHandler(logoutController));
router.use("/protected", protect);
router.use("/auth", auth);

export default router;
