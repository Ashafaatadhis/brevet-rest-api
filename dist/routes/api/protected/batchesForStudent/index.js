"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const batchesForStudent_1 = require("../../../../controller/protected/batchesForStudent");
const router = express_1.default.Router();
router.get("/", (0, errorHandler_1.default)(batchesForStudent_1.getAllController));
router.get("/:id", (0, errorHandler_1.default)(batchesForStudent_1.getById));
exports.default = router;
