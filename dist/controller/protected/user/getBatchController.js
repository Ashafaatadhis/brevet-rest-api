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
const prisma_1 = __importDefault(require("../../../config/prisma"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const data = yield prisma_1.default.payment.findMany({
            where: {
                deletedAt: {
                    isSet: false,
                },
                userId: user.id,
                status: {
<<<<<<< HEAD
                    equals: true,
=======
                    equals: "PAID",
>>>>>>> 02861ccee35cfb04eee816b7b616a73608c4be87
                },
            },
        });
        res.json({ status: true, data });
    }
    catch (err) {
        res.status(404).json({ status: false, message: "Courses not found" });
    }
});
