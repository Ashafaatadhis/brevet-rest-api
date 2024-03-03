"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = require("../../../../utils/validator");
const errorHandler_1 = __importDefault(require("../../../../middleware/errorHandler"));
const multer_1 = __importDefault(require("../../../../config/multer"));
const user_1 = require("../../../../controller/protected/user");
const router = express_1.default.Router();
// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );
router.delete("/:id", (0, errorHandler_1.default)(user_1.deleteByIdController));
router.put("/:id", multer_1.default.single("image"), validator_1.updateValidator, (0, errorHandler_1.default)(user_1.editByIdController));
router.get("/:id", (0, errorHandler_1.default)(user_1.getByIdController));
router.get("/", (0, errorHandler_1.default)(user_1.getAllController));
exports.default = router;
