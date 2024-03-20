"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const payment_1 = require("../../../../controller/protected/payment");
const router = express_1.default.Router();
router.post("/", validator_1.addBatchValidator, (0, errorHandler_1.default)(payment_1.addPaymentController));
router.put("/:id", (0, errorHandler_1.default)(payment_1.editPaymentController));
router.delete("/:id", (0, errorHandler_1.default)(payment_1.deletePaymentController));
router.get("/", (0, errorHandler_1.default)(payment_1.getAllPaymentController));
router.get("/:id", (0, errorHandler_1.default)(payment_1.getByIdPaymentController));
exports.default = router;
