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
const uploadFile_1 = require("../../../middleware/uploadFile");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const id = req.params.id;
        if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            const payment = yield prisma_1.default.proofPayment.findFirst({
                select: {
                    payment: {
                        select: {
                            userId: true,
                        },
                    },
                },
                where: {
                    id,
                    deletedAt: {
                        isSet: false,
                    },
                },
            });
            if ((payment === null || payment === void 0 ? void 0 : payment.payment.userId) !== user.id) {
                return res
                    .status(401)
                    .json({ success: false, message: "Unauthorized" });
            }
        }
        try {
            const thisUser = yield prisma_1.default.proofPayment.findUnique({
                select: {
                    file: true,
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
                req.body.file = thisUser === null || thisUser === void 0 ? void 0 : thisUser.file;
            }
            else {
                req.body.file = urlImage.secure_url;
                req.body.name = urlImage.name;
            }
            const data = yield prisma_1.default.proofPayment.update({
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
            return res
                .status(400)
                .json({ success: false, message: "Failed Edit Course Folder" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
