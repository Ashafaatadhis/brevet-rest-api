"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = __importDefault(require("../../../utils/errors/HttpError"));
const config_1 = __importDefault(require("../../../config/config"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["refreshToken"];
    if (!refreshToken) {
        return next(new HttpError_1.default(401, "Token not valid"));
    }
    try {
        const decode = jsonwebtoken_1.default.verify(refreshToken, config_1.default.secret.refresh_token_secret);
        // const newDecode = JSON.parse(decode as string);
        const accessToken = jsonwebtoken_1.default.sign({
            id: decode.id,
            username: decode.username,
            role: decode.role,
            email: decode.email,
        }, config_1.default.secret.access_token_secret, {
            expiresIn: "1h",
        });
        return res.status(200).json({ status: true, accessToken });
    }
    catch (err) {
        res.clearCookie("refreshToken");
        return next(new HttpError_1.default(401, err.message));
    }
});
