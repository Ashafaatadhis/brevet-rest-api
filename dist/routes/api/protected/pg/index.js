"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const pg_1 = require("../../../../controller/protected/pg");
const validator_1 = require("../../../../utils/validator");
const router = express_1.default.Router();
router.post("/", 
// multerFile.array("file", 10),
validator_1.addPGValidator, (0, errorHandler_1.default)(pg_1.addPGController));
router.put("/:id", validator_1.addPGValidator, (0, errorHandler_1.default)(pg_1.editPGController));
router.delete("/:id", (0, errorHandler_1.default)(pg_1.deletePGController));
router.get("/", (0, errorHandler_1.default)(pg_1.getAllPGController));
router.get("/:id", (0, errorHandler_1.default)(pg_1.getByIdPGController));
exports.default = router;
