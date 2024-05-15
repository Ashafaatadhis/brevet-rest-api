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
        try {
            const findBatch = yield prisma_1.default.batch.findUnique({
                where: {
                    id: req.body.batchId,
                    deletedAt: { isSet: false },
                },
            });
            if (!findBatch) {
                throw new Error("Not exist");
            }
            req.body.userId = user.id;
            const data = yield prisma_1.default.payment.create({
                data: req.body,
            });
            return res.json({ success: true, data });
        }
        catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ success: false, message: "Failed Add Payment" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
