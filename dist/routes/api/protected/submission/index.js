"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const submission_1 = require("../../../../controller/protected/submission");
const validator_1 = require("../../../../utils/validator");
const multerFile_1 = __importDefault(require("../../../../config/multerFile"));
const router = express_1.default.Router();
router.post("/", multerFile_1.default.array("file", 10), validator_1.addSubmissionValidator, (0, errorHandler_1.default)(submission_1.addSubmissionController));
router.put("/:id", validator_1.addSubmissionValidator, (0, errorHandler_1.default)(submission_1.editSubmissionController));
router.delete("/:id", (0, errorHandler_1.default)(submission_1.deleteSubmissionController));
router.get("/", (0, errorHandler_1.default)(submission_1.getAllByIdSubmissionController));
router.get("/:id", (0, errorHandler_1.default)(submission_1.getByIdSubmissionController));
exports.default = router;
