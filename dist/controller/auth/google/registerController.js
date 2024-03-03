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
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = require("../../../utils/bcrypt");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!data.email) {
        return res
            .status(400)
            .json({ success: false, message: "User does not have email" });
    }
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            AND: {
                email: data.email,
                provider: "GOOGLE",
                deletedAt: {
                    isSet: false,
                },
            },
        },
    });
    if (existingUser) {
        return res
            .status(409)
            .json({ success: false, message: "User already exist" });
    }
    try {
        const genPassword = yield (0, bcrypt_1.hashPassword)(Math.random().toString(36).slice(2) +
            Math.random().toString(36).toUpperCase().slice(2));
        const user = yield prisma_1.default.user.create({
            data: {
                email: data.email,
                fullname: data.given_name,
                password: genPassword,
                username: data.name,
                image: data.picture,
            },
        });
        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
                fullname: user.fullname,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
                deletedAt: user.deletedAt,
            },
        });
    }
    catch (err) {
        return res
            .status(409)
            .json({ success: false, message: "User already exist" });
    }
});
