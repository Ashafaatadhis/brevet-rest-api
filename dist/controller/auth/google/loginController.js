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
const HttpError_1 = __importDefault(require("../../../utils/errors/HttpError"));
const prisma_1 = __importDefault(require("../../../config/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const axios_1 = __importDefault(require("axios"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.cookies?.["refreshToken"]) {
    //   return next(new HttpError(200, "User has been logged in"));
    // }
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        var { data } = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    catch (err) {
        return next(new HttpError_1.default(400, "Token Invalid"));
    }
    // in case request params meet the validation criteria
    try {
        const isExistUser = yield prisma_1.default.user.findFirstOrThrow({
            where: {
                username: data.name,
                deletedAt: {
                    isSet: false,
                },
            },
        });
        const accessToken = jsonwebtoken_1.default.sign({
            id: isExistUser.id,
            username: isExistUser.username,
            role: isExistUser.role,
            email: isExistUser.email,
        }, config_1.default.secret.access_token_secret, {
            expiresIn: "30s",
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            id: isExistUser.id,
            username: isExistUser.username,
            role: isExistUser.role,
            email: isExistUser.email,
        }, config_1.default.secret.refresh_token_secret, {
            expiresIn: "1d",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config_1.default.env !== "development",
            maxAge: 60 * 60 * 24 * 1000, // 1 day
        });
        return res.status(200).json({
            success: true,
            accessToken,
            data: {
                id: isExistUser.id,
                username: isExistUser.username,
                role: isExistUser.role,
                email: isExistUser.email,
                fullname: isExistUser.fullname,
                image: isExistUser.image,
                created_at: isExistUser.createdAt,
                updated_at: isExistUser.updatedAt,
                deletedAt: isExistUser.deletedAt,
            },
        });
    }
    catch (err) {
        console.log(err);
        return next(new HttpError_1.default(400, "username / password incorrect"));
    }
});
