import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import passport from "../../../middleware/jwt";
const router = express.Router();

// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user, "WWW");
    res.json({ msg: "welkam" });
  }
);

export default router;
