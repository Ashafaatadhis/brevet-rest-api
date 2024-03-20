import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import user from "./user";
import course from "./course";
import batch from "./batch";
import courseFile from "./courseFile";
import courseFolder from "./courseFolder";
import batchCourse from "./batchCourse";
import payment from "./payment";
import userCourses from "./userCourses";
import authJwt from "../../../middleware/authJwt";
const router = express.Router();

// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );

// middleware
router.use(authJwt);

router.get("/", (req: Request, res: Response) => {
  res.json({ msg: "welkam" });
});

router.use("/user", user);
router.use("/course", course);
router.use("/batch", batch);
router.use("/courseFile", courseFile);
router.use("/courseFolder", courseFolder);
router.use("/batchCourse", batchCourse);
router.use("/payment", payment);
router.use("/userCourses", userCourses);

export default router;
