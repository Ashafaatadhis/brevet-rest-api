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
const bcrypt_1 = require("../../../utils/bcrypt");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("WOOOWW");
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        const hashing = yield (0, bcrypt_1.hashPassword)(req.body.password);
        const userExist = yield prisma_1.default.user.findFirst({
            where: {
                email: req.body.email,
                provider: "LOCAL",
                deletedAt: {
                    isSet: false,
                },
            },
        });
        if (userExist) {
            return res
                .status(409)
                .json({ success: false, message: "User already exist" });
        }
        try {
            // const urlImage = await uploadFile(req, res, next);
            // req.body.image = urlImage;
            // if (!req.body.image) return next(new HttpError(400, "Image not found"));
            const user = yield prisma_1.default.user.create({
                data: {
                    email: req.body.email,
                    fullname: req.body.fullname,
                    password: hashing,
                    username: req.body.username,
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
    }
    res.status(422).json({ success: false, error: errors.array() });
});
