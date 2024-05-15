"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const proofPayment_1 = require("../../../../controller/protected/proofPayment");
const multerFile_1 = __importDefault(require("../../../../config/multerFile"));
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", multerFile_1.default.single("file"), validator_1.addProofPaymentValidator, (0, errorHandler_1.default)(proofPayment_1.addproofPaymentController));
router.put("/:id", multerFile_1.default.single("file"), (0, errorHandler_1.default)(proofPayment_1.editProofPaymentController));
router.delete("/:id", (0, errorHandler_1.default)(proofPayment_1.deleteProofPaymentController));
router.get("/", (0, errorHandler_1.default)(proofPayment_1.getAllCourseFileController));
router.get("/current", (0, errorHandler_1.default)(proofPayment_1.getCurrentDataProofPayment));
router.get("/all/:id", (0, errorHandler_1.default)(proofPayment_1.getAllByIdCourseFileController));
router.get("/:id", (0, errorHandler_1.default)(proofPayment_1.getByIdCourseFileController));
exports.default = router;
