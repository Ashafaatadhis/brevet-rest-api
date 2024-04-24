"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const questionAnswer_1 = require("../../../../controller/protected/questionAnswer");
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", 
// multerFile.array("file", 10),
validator_1.addQuestionAnswerValidator, (0, errorHandler_1.default)(questionAnswer_1.addQuestionAnswerController));
router.put("/:id", validator_1.addQuestionAnswerValidator, (0, errorHandler_1.default)(questionAnswer_1.editQuestionAnswerController));
router.delete("/:id", (0, errorHandler_1.default)(questionAnswer_1.deleteQuestionAnswerController));
router.get("/", (0, errorHandler_1.default)(questionAnswer_1.getAllQuestionAnswerController));
router.get("/:id", (0, errorHandler_1.default)(questionAnswer_1.getByIdQuestionAnswerController));
exports.default = router;
