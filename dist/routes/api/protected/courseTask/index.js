"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const courseTask_1 = require("../../../../controller/protected/courseTask");
const router = express_1.default.Router();
router.post("/", validator_1.addCourseTaskValidator, (0, errorHandler_1.default)(courseTask_1.addCourseTaskController));
router.put("/:id", 
// addCourseTaskValidator,
(0, errorHandler_1.default)(courseTask_1.editCourseTaskController));
router.delete("/:id", (0, errorHandler_1.default)(courseTask_1.deleteCourseTaskController));
router.get("/", (0, errorHandler_1.default)(courseTask_1.getAllCourseTaskController));
router.get("/:id", (0, errorHandler_1.default)(courseTask_1.getByIdCourseTaskController));
exports.default = router;
