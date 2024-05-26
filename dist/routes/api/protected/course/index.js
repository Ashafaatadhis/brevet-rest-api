"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const course_1 = require("../../../../controller/protected/course");
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", validator_1.addCourseValidator, (0, errorHandler_1.default)(course_1.addCourseController));
router.put("/:id", validator_1.editCourseValidator, (0, errorHandler_1.default)(course_1.editCourseController));
router.delete("/:id", (0, errorHandler_1.default)(course_1.deleteCourseController));
router.get("/", (0, errorHandler_1.default)(course_1.getAllCourseController));
router.get("/all/:id", (0, errorHandler_1.default)(course_1.getAllByIdController));
router.get("/:id", (0, errorHandler_1.default)(course_1.getByIdCourseController));
exports.default = router;
