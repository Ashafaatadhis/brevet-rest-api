import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import passport from "../../../middleware/google/";

import config from "../../../config/config";
const router = express.Router();

let back = "";

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
