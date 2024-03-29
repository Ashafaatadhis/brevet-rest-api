"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const course_1 = __importDefault(require("./course"));
const batch_1 = __importDefault(require("./batch"));
const courseFile_1 = __importDefault(require("./courseFile"));
const courseFolder_1 = __importDefault(require("./courseFolder"));
const batchCourse_1 = __importDefault(require("./batchCourse"));
const payment_1 = __importDefault(require("./payment"));
const userCourses_1 = __importDefault(require("./userCourses"));
const authJwt_1 = __importDefault(require("../../../middleware/authJwt"));
const router = express_1.default.Router();
// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );
// middleware
router.use(authJwt_1.default);
router.get("/", (req, res) => {
    res.json({ msg: "welkam" });
});
router.use("/user", user_1.default);
router.use("/course", course_1.default);
router.use("/batch", batch_1.default);
router.use("/courseFile", courseFile_1.default);
router.use("/courseFolder", courseFolder_1.default);
router.use("/batchCourse", batchCourse_1.default);
router.use("/payment", payment_1.default);
router.use("/userCourses", userCourses_1.default);
exports.default = router;
