"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const userCourses_1 = require("../../../../controller/protected/userCourses");
const multer_1 = __importDefault(require("../../../../config/multer"));
const router = express_1.default.Router();
router.post("/", multer_1.default.single("bukti_bayar"), validator_1.addUserCourseValidator, (0, errorHandler_1.default)(userCourses_1.addUserCoursesController));
router.put("/:id", validator_1.addBatchValidator, (0, errorHandler_1.default)(userCourses_1.editUserCoursesController));
router.delete("/:id", (0, errorHandler_1.default)(userCourses_1.deleteUserCoursesController));
router.get("/", (0, errorHandler_1.default)(userCourses_1.getAllUserCoursesController));
router.get("/:id", (0, errorHandler_1.default)(userCourses_1.getByIdUserCoursesController));
exports.default = router;
