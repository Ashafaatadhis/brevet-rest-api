"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../../../utils/validator");
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const multer_1 = __importDefault(require("../../../../config/multer"));
const user_1 = require("../../../../controller/protected/user");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );
router.delete("/:id", (0, errorHandler_1.default)(user_1.deleteByIdController));
router.put("/change-password/:id", validator_1.changePasswordValidator, (0, errorHandler_1.default)(user_1.changePasswordByIdController));
router.put("/:id", multer_1.default.single("image"), validator_1.updateValidator, (0, errorHandler_1.default)(user_1.editByIdController));
router.get("/get-batch", (0, errorHandler_1.default)(user_1.getBatchController));
router.get("/current", (0, errorHandler_1.default)(user_1.getCurrentUser));
router.get("/:id", (0, errorHandler_1.default)(user_1.getByIdController));
router.get("/get-courses/:batchId/:courseId", (0, errorHandler_1.default)(user_1.getCoursesController));
router.get("/", (0, errorHandler_1.default)(user_1.getAllController));
exports.default = router;
