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
const superUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.payment.findMany({
        where: {
            deletedAt: {
                isSet: false,
            },
        },
    });
    return res.json({ success: true, data });
});
const basicUser = (req, res, next, user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.payment.findMany({
        where: {
            userCourses: {
                userId: user.id,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    return res.json({ success: true, data });
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
        return basicUser(req, res, next, user);
        // return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        superUser(req, res, next);
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Payment Error occured" });
    }
});
