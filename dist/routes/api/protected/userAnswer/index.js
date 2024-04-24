"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const userAnswer_1 = require("../../../../controller/protected/userAnswer");
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", 
// multerFile.array("file", 10),
validator_1.addUserAnswerValidator, (0, errorHandler_1.default)(userAnswer_1.addUserAnswerController));
router.put("/:id", validator_1.addUserAnswerValidator, (0, errorHandler_1.default)(userAnswer_1.editUserAnswerController));
router.delete("/:id", (0, errorHandler_1.default)(userAnswer_1.deleteUserAnswerController));
router.get("/", (0, errorHandler_1.default)(userAnswer_1.getAllUserAnswerController));
router.get("/:id", (0, errorHandler_1.default)(userAnswer_1.getByIdUserAnswerController));
exports.default = router;
