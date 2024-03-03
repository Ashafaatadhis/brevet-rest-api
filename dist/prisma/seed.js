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
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.default.user.deleteMany();
        yield prisma_1.default.user.create({
            data: {
                email: "teacher@gmail.com",
                fullname: "teacher",
                password: (yield (0, bcrypt_1.hashPassword)("teacher@123")),
                username: "teacher",
                role: "TEACHER",
            },
        });
        yield prisma_1.default.user.create({
            data: {
                email: "student@gmail.com",
                fullname: "student",
                password: (yield (0, bcrypt_1.hashPassword)("student@123")),
                username: "student",
                role: "STUDENT",
            },
        });
        yield prisma_1.default.user.create({
            data: {
                email: "admin@gmail.com",
                fullname: "admin",
                password: (yield (0, bcrypt_1.hashPassword)("admin@123")),
                username: "admin",
                role: "ADMIN",
            },
        });
        yield prisma_1.default.user.create({
            data: {
                email: "superadmin@gmail.com",
                fullname: "superadmin",
                password: (yield (0, bcrypt_1.hashPassword)("superadmin@123")),
                username: "superadmin",
                role: "SUPERADMIN",
            },
        });
        const allUsers = yield prisma_1.default.user.findMany();
        console.dir(allUsers);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma_1.default.$disconnect();
    process.exit(1);
}));
