import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import passport from "../../../middleware/google/";
// import passportFB from "../../../middleware/facebook";

import config from "../../../config/config";
import axios from "axios";
import prisma from "../../../config/prisma";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";
import HttpError from "../../../utils/errors/HttpError";
import loginController from "../../../controller/auth/google/loginController";
import registerController from "../../../controller/auth/google/registerController";
import errorHandler from "../../../middleware/errorHandler";
const router = express.Router();

let back = "";

// router.get(
//   "/facebook",
//   (req: Request, res, next) => {
//     back = req.query["back"] as string;
//     next();
//   },
//   passportFB.authenticate("facebook")
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     session: false,
//   }),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("inoi", req.user);
//   }
// );

router.post("/google/signin", errorHandler(loginController));

router.post("/google/signup", errorHandler(registerController));

router.get(
  "/google",
  (req: Request, res, next) => {
    back = req.query["back"] as string;
    next();
  },
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/failure", (req, res, next) => {
  console.log("Ini");
  res.cookie("flash", "User not registered", {
    maxAge: 1000 * 5,
  });
  res.redirect(back);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    // successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
  }),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Masuk");
    const user: any = req.user;
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      config.secret.access_token_secret,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      config.secret.refresh_token_secret,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("accessToken", accessToken, {
      // domain: config.callbackUrl,

      secure: config.env !== "development",
      maxAge: 1000 * 30 /* 30s */,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,

      secure: config.env !== "development",

      maxAge: 60 * 60 * 24 * 1000, // 1 day
    });

    const p = `
    <html>
    <body>
    <script>
    window.location.href="${back}"
    </script>
    </body>
    </html>
    `;
    res.send(p);
  }
);

export default router;
