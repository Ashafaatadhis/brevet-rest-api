"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authJwt_1 = __importDefault(require("../../../middleware/authJwt"));
const router = express_1.default.Router();
// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );
router.get("/", authJwt_1.default, (req, res) => {
    res.json({ msg: "welkam" });
});
exports.default = router;
