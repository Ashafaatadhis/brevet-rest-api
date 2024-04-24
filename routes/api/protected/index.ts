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
import courseTask from "./courseTask";
import courseTaskFile from "./courseTaskFile";
import submission from "./submission";
import question from "./question";
import questionAnswer from "./questionAnswer";
import userAnswer from "./userAnswer";
import pg from "./pg";
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
router.use("/courseTask", courseTask);
router.use("/courseTaskFile", courseTaskFile);
router.use("/submission", submission);
router.use("/question", question);
router.use("/questionAnswer", questionAnswer);
router.use("/userAnswer", userAnswer);
router.use("/pg", pg);

export default router;
