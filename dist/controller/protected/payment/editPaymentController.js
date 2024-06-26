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
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const id = req.params.id;
        // if (!["ADMIN", "SUPERADMIN"].includes(user.role))
        //   return res.status(401).json({ success: false, message: "Unauthorized" });
        try {
<<<<<<< HEAD
            const thisUser = yield prisma_1.default.payment.findFirst({
                select: {
                    bukti_bayar: true,
                },
                where: {
                    id,
                    deletedAt: {
                        isSet: false,
                    },
                },
            });
            const urlImage = yield (0, uploadFile_1.uploadSingle)(req, "payment");
            if (!urlImage) {
                req.body.bukti_bayar = thisUser === null || thisUser === void 0 ? void 0 : thisUser.bukti_bayar;
            }
            else {
                req.body.bukti_bayar = urlImage.secure_url;
            }
=======
>>>>>>> 02861ccee35cfb04eee816b7b616a73608c4be87
            const data = yield prisma_1.default.payment.update({
                data: Object.assign(Object.assign({}, req.body), { updatedAt: new Date().toISOString() }),
                where: {
                    id,
                    deletedAt: {
                        isSet: false,
                    },
                },
            });
            return res.json({ success: true, data });
        }
        catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ success: false, message: "Failed Edit Payment" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
