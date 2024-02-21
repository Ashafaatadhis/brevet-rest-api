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
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const HttpError_1 = __importDefault(require("../utils/errors/HttpError"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // in case request params meet the validation criteria
        console.log(req.body);
        const hashing = yield (0, bcrypt_1.hashPassword)(req.body.password);
        if (!req.body.image)
            return next(new HttpError_1.default(400, "Image not found"));
        yield prisma_1.default.user.create({
            data: {
                email: req.body.email,
                fullname: req.body.email,
                image: req.body.image,
                password: hashing,
                username: req.body.username,
            },
        });
        return res.status(200).json({ success: true });
    }
    res.status(422).json({ success: false, error: errors.array() });
});
