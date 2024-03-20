"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const courseFile_1 = require("../../../../controller/protected/courseFile");
const multerFile_1 = __importDefault(require("../../../../config/multerFile"));
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", multerFile_1.default.array("file", 10), validator_1.addCourseFileValidator, (0, errorHandler_1.default)(courseFile_1.addCourseFileController));
router.put("/:id", multerFile_1.default.single("file"), (0, errorHandler_1.default)(courseFile_1.editCourseFileController));
router.delete("/:id", (0, errorHandler_1.default)(courseFile_1.deleteCourseFileController));
router.get("/", (0, errorHandler_1.default)(courseFile_1.getAllCourseFileController));
router.get("/:id", (0, errorHandler_1.default)(courseFile_1.getByIdCourseFileController));
exports.default = router;
