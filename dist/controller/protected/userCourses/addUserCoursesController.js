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
        try {
            const urlImage = yield (0, uploadFile_1.uploadSingle)(req, "payment");
            if (!urlImage) {
                return next(new HttpError_1.default(404, "File not found"));
            }
            const count = yield prisma_1.default.userCourses.findMany({
                where: {
                    deletedAt: {
                        isSet: false,
                    },
                    payment: {
                        status: {
                            equals: true,
                        },
                    },
                },
            });
            const batchKuota = yield prisma_1.default.batch.findFirst({
                select: {
                    kuota: true,
                },
                where: {
                    id: req.body.batchId,
                },
            });
            const kuota = (batchKuota === null || batchKuota === void 0 ? void 0 : batchKuota.kuota) ? batchKuota === null || batchKuota === void 0 ? void 0 : batchKuota.kuota : 0;
            const dataUserCourses = yield prisma_1.default.userCourses.create({
                data: {
                    batchId: req.body.batchId,
                    userId: user.id,
                },
                select: {
                    id: true,
                },
            });
            // kuota is terpenuhi
            if (!(count.length < kuota)) {
                return res.json({
                    success: false,
                    message: "Quota Batch is fulfilled",
                });
            }
            yield prisma_1.default.payment.create({
                data: {
                    atas_nama: req.body.atas_nama,
                    bank: req.body.bank,
                    bukti_bayar: urlImage.secure_url,
                    no_rek: req.body.no_rek,
                    userCoursesId: dataUserCourses.id,
                },
            });
            return res.json({ success: true, message: "Success Created" });
        }
        catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ success: false, message: "Failed Add User Course" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
