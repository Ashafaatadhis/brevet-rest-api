"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const courseFolder_1 = require("../../../../controller/protected/courseFolder");
const router = express_1.default.Router();
router.post("/", validator_1.addCourseFolderValidator, (0, errorHandler_1.default)(courseFolder_1.addCourseFolderController));
router.put("/:id", validator_1.addCourseFolderValidator, (0, errorHandler_1.default)(courseFolder_1.editCourseFolderController));
router.delete("/:id", (0, errorHandler_1.default)(courseFolder_1.deleteCourseFolderController));
router.get("/", (0, errorHandler_1.default)(courseFolder_1.getAllCourseFolderController));
router.get("/:id", (0, errorHandler_1.default)(courseFolder_1.getByIdCourseFolderController));
router.get("/all/:id", (0, errorHandler_1.default)(courseFolder_1.getAllByIdCourseFolderController));
exports.default = router;
