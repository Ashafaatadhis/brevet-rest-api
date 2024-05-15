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
<<<<<<< HEAD
router.post("/", multer_1.default.single("bukti_bayar"), validator_1.addPaymentValidator, (0, errorHandler_1.default)(payment_1.addPaymentController));
router.put("/:id", multer_1.default.single("bukti_bayar"), validator_1.editPaymentValidator, (0, errorHandler_1.default)(payment_1.editPaymentController));
=======
router.post("/", 
// multer.single("bukti_bayar"),
validator_1.addPaymentValidator, (0, errorHandler_1.default)(payment_1.addPaymentController));
router.put("/:id", 
// multer.single("bukti_bayar"),
validator_1.editPaymentValidator, (0, errorHandler_1.default)(payment_1.editPaymentController));
>>>>>>> 02861ccee35cfb04eee816b7b616a73608c4be87
router.delete("/:id", (0, errorHandler_1.default)(payment_1.deletePaymentController));
router.get("/", (0, errorHandler_1.default)(payment_1.getAllPaymentController));
router.get("/current", (0, errorHandler_1.default)(payment_1.getCurrentPayment));
router.get("/:id", (0, errorHandler_1.default)(payment_1.getByIdPaymentController));
exports.default = router;
