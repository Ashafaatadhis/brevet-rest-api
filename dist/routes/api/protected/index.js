"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("../../../middleware/jwt"));
const router = express_1.default.Router();
// router.post(
//   "/register",
//   passport.authenticate("local"),
//   (req: Request, res: Response) => {
//     res.json({ msg: "woi" });
//   }
// );
router.get("/", jwt_1.default.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.user, "WWW");
    res.json({ msg: "welkam" });
});
exports.default = router;
