"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const courseTaskFile_1 = require("../../../../controller/protected/courseTaskFile");
const multerFile_1 = __importDefault(require("../../../../config/multerFile"));
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", multerFile_1.default.array("file", 10), validator_1.addCourseTaskFileValidator, (0, errorHandler_1.default)(courseTaskFile_1.addCourseTaskFileController));
router.put("/:id", multerFile_1.default.single("file"), (0, errorHandler_1.default)(courseTaskFile_1.editCourseTaskFileController));
router.delete("/:id", (0, errorHandler_1.default)(courseTaskFile_1.deleteCourseTaskFileController));
router.get("/", (0, errorHandler_1.default)(courseTaskFile_1.getAllCourseTaskFileController));
router.get("/all/:id", (0, errorHandler_1.default)(courseTaskFile_1.getAllByIdCourseTaskFileController));
router.get("/:id", (0, errorHandler_1.default)(courseTaskFile_1.getByIdCourseTaskFileController));
exports.default = router;
