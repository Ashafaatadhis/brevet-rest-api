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
const HttpError_1 = __importDefault(require("../../../utils/errors/HttpError"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        // if (!["ADMIN", "SUPERADMIN"].includes(user.role))
        //   return res.status(401).json({ success: false, message: "Unauthorized" });
        try {
            const urlImage = yield (0, uploadFile_1.uploadSingle)(req, "payment");
            if (!urlImage) {
                return next(new HttpError_1.default(404, "File not found"));
            }
            req.body.file = urlImage.secure_url;
            req.body.name = urlImage.name;
            const findPayment = yield prisma_1.default.payment.findUnique({
                where: {
                    id: req.body.paymentId,
                    deletedAt: { isSet: false },
                },
            });
            if (!findPayment) {
                throw new Error("Not exist");
            }
            // const data = await prisma.proofPayment.create({
            //   data: req.body,
            // });
            const [data] = yield prisma_1.default.$transaction([
                prisma_1.default.proofPayment.create({
                    data: req.body,
                }),
                prisma_1.default.payment.update({
                    where: {
                        id: req.body.paymentId,
                        deletedAt: {
                            isSet: false,
                        },
                    },
                    data: {
                        status: "PENDING",
                    },
                }),
            ]);
            return res.json({
                success: true,
                data,
                message: "File success Uploaded",
            });
        }
        catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ success: false, message: "Failed Add proof payment" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
