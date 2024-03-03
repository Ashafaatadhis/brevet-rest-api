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
    console.log(req.headers.authorization);
    const user = req === null || req === void 0 ? void 0 : req.user;
    console.log(user);
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const data = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            fullname: true,
            username: true,
            password: false,
            provider: false,
            image: true,
            role: true,
            NPM: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
        },
        where: {
            deletedAt: {
                isSet: false,
            },
        },
    }); // if role admin
    res.json({ status: 200, data });
});
