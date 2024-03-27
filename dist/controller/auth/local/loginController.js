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
const express_validator_1 = require("express-validator");
const prisma_1 = __importDefault(require("../../../config/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("../../../utils/bcrypt");
const config_1 = __importDefault(require("../../../config/config"));
const HttpError_1 = __importDefault(require("../../../utils/errors/HttpError"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // if (req.cookies?.["refreshToken"]) {
        //   return next(new HttpError(200, "User has been logged in"));
        // }
        // in case request params meet the validation criteria
        try {
            const isExistUser = yield prisma_1.default.user.findFirstOrThrow({
                where: {
                    username: req.body.username,
                    deletedAt: {
                        isSet: false,
                    },
                },
                include: {
                    userCourses: true,
                },
            });
            //   if password correct
            if (yield (0, bcrypt_1.comparePassword)(req.body.password, isExistUser.password)) {
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
                    sameSite: config_1.default.env !== "development" ? "none" : "lax",
                    httpOnly: true,
                    // secure: true,
                    secure: config_1.default.env !== "development",
                    maxAge: 60 * 60 * 24 * 1000, // 1 day
                });
                return res.status(200).json({
                    success: true,
                    accessToken,
                    data: {
                        id: isExistUser.id,
                        email: isExistUser.email,
                        fullname: isExistUser.fullname,
                        username: isExistUser.username,
                        provider: isExistUser.provider,
                        image: isExistUser.image,
                        phoneNumber: isExistUser.phoneNumber,
                        role: isExistUser.role,
                        golongan: isExistUser.golongan,
                        NPM: isExistUser.NPM,
                        createdAt: isExistUser.createdAt,
                        updatedAt: isExistUser.updatedAt,
                        deletedAt: isExistUser.deletedAt,
                    },
                });
            }
        }
        catch (err) {
            console.log(err);
            return next(new HttpError_1.default(400, "username / password incorrect"));
        }
        console.log("WOI");
        return res
            .status(400)
            .json({ success: false, message: "username / password incorrect" });
    }
    res.status(422).json({ success: false, error: errors.array() });
});
