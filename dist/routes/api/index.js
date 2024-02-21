"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const protected_1 = __importDefault(require("./protected"));
const validator_1 = require("../../utils/validator");
const registerController_1 = __importDefault(require("../../controller/registerController"));
const loginController_1 = __importDefault(require("../../controller/loginController"));
const logoutController_1 = __importDefault(require("../../controller/logoutController"));
const refreshTokenController_1 = __importDefault(require("../../controller/refreshTokenController"));
const uploadFile_1 = __importDefault(require("../../middleware/uploadFile"));
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.send({ message: "Welcome to brevet Rest API" });
});
router.post("/register", uploadFile_1.default, validator_1.registerValidator, registerController_1.default);
router.post("/login", validator_1.loginValidator, loginController_1.default);
router.post("/refreshToken", refreshTokenController_1.default);
router.delete("/logout", logoutController_1.default);
router.use("/protected", protected_1.default);
router.use("/auth", auth_1.default);
exports.default = router;
