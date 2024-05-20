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
const courseTask_1 = __importDefault(require("./courseTask"));
const courseTaskFile_1 = __importDefault(require("./courseTaskFile"));
const submission_1 = __importDefault(require("./submission"));
const question_1 = __importDefault(require("./question"));
const questionAnswer_1 = __importDefault(require("./questionAnswer"));
const userAnswer_1 = __importDefault(require("./userAnswer"));
const proofPayment_1 = __importDefault(require("./proofPayment"));
const pg_1 = __importDefault(require("./pg"));
const price_1 = __importDefault(require("./price"));
const batchesForStudent_1 = __importDefault(require("./batchesForStudent"));
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
router.use("/courseTask", courseTask_1.default);
router.use("/courseTaskFile", courseTaskFile_1.default);
router.use("/submission", submission_1.default);
router.use("/question", question_1.default);
router.use("/questionAnswer", questionAnswer_1.default);
router.use("/userAnswer", userAnswer_1.default);
router.use("/pg", pg_1.default);
router.use("/proofPayment", proofPayment_1.default);
router.use("/batchesForStudent", batchesForStudent_1.default);
router.use("/price", price_1.default);
exports.default = router;
