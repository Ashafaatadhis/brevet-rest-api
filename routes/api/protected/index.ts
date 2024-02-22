import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import authJwt from "../../../middleware/authJwt";
const router = express.Router();

// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );

router.get("/", authJwt, (req: Request, res: Response) => {
  res.json({ msg: "welkam" });
});

export default router;
