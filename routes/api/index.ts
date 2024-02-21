import express from "express";
import auth from "./auth";
import protect from "./protected";
import { loginValidator, registerValidator } from "../../utils/validator";

import registerController from "../../controller/registerController";
import loginController from "../../controller/loginController";
import logoutController from "../../controller/logoutController";
import refreshTokenController from "../../controller/refreshTokenController";

import uploadFile from "../../middleware/uploadFile";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ message: "Welcome to brevet Rest API" });
});

router.post("/register", uploadFile, registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.post("/refreshToken", refreshTokenController);
router.delete("/logout", logoutController);
router.use("/protected", protect);
router.use("/auth", auth);

export default router;
