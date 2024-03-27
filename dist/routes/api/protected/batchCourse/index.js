"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const batchCourse_1 = require("../../../../controller/protected/batchCourse");
const router = express_1.default.Router();
router.post("/", validator_1.addBatchCourseValidator, (0, errorHandler_1.default)(batchCourse_1.addBatchCourseController));
router.put("/:id", validator_1.addBatchCourseValidator, (0, errorHandler_1.default)(batchCourse_1.editBatchCourseController));
router.delete("/:id", (0, errorHandler_1.default)(batchCourse_1.deleteBatchCourseController));
router.get("/all/:id", (0, errorHandler_1.default)(batchCourse_1.getAllByIdBatchCourseController));
router.get("/", (0, errorHandler_1.default)(batchCourse_1.getAllBatchCourseController));
router.get("/:id", (0, errorHandler_1.default)(batchCourse_1.getByIdBatchCourseController));
exports.default = router;
