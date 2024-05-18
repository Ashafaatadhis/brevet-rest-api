"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const batch_1 = require("../../../../controller/protected/batch");
const router = express_1.default.Router();
router.post("/", validator_1.addBatchValidator, (0, errorHandler_1.default)(batch_1.addBatchController));
router.get("/search", (0, errorHandler_1.default)(batch_1.searchBatchController));
router.put("/:id", validator_1.editBatchValidator, (0, errorHandler_1.default)(batch_1.editBatchController));
router.delete("/:id", (0, errorHandler_1.default)(batch_1.deleteBatchController));
router.get("/", (0, errorHandler_1.default)(batch_1.getAllBatchController));
router.get("/:id", (0, errorHandler_1.default)(batch_1.getByIdBatchController));
exports.default = router;
