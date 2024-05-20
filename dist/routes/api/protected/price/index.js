"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const validator_1 = require("../../../../utils/validator");
const price_1 = require("../../../../controller/protected/price");
const router = express_1.default.Router();
router.post("/", validator_1.addPriceValidator, (0, errorHandler_1.default)(price_1.addPriceController));
router.put("/:id", validator_1.editPriceValidator, (0, errorHandler_1.default)(price_1.editPriceController));
router.delete("/:id", (0, errorHandler_1.default)(price_1.deletePriceController));
router.get("/", (0, errorHandler_1.default)(price_1.getPriceController));
router.get("/current", (0, errorHandler_1.default)(price_1.getCurrentPriceController));
exports.default = router;
