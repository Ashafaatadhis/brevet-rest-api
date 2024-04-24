"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const question_1 = require("../../../../controller/protected/question");
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", 
// multerFile.array("file", 10),
validator_1.addQuestionValidator, (0, errorHandler_1.default)(question_1.addQuestionController));
router.put("/:id", validator_1.addQuestionValidator, (0, errorHandler_1.default)(question_1.editQuestionController));
router.delete("/:id", (0, errorHandler_1.default)(question_1.deleteQuestionController));
router.get("/", (0, errorHandler_1.default)(question_1.getAllQuestionController));
router.get("/:id", (0, errorHandler_1.default)(question_1.getByIdQuestionController));
exports.default = router;
