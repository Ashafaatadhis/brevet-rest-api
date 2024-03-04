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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const id = req.params.id;
        // req.body["confirmPassword"] = undefined;
        if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            if (id !== user.id) {
                return res.status(401).json({ status: false, message: "Unauthorized" });
            }
        }
        const isExistUser = yield prisma_1.default.user.findFirst({
            where: {
                id,
            },
        });
        if (!isExistUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        if (req.body.oldPassword) {
            if (!(yield (0, bcrypt_1.comparePassword)(req.body.oldPassword, isExistUser.password))) {
                return res
                    .status(401)
                    .json({ success: false, message: "Wrong Password" });
            }
        }
        yield prisma_1.default.user.update({
            data: {
                password: (yield (0, bcrypt_1.hashPassword)(req.body.password)),
                updatedAt: new Date().toISOString(),
            },
            where: {
                id,
                deletedAt: {
                    isSet: false,
                },
            },
        });
        return res.json({
            success: true,
            message: "Password success changed",
        });
    }
    res.status(422).json({ success: false, error: errors.array() });
});
