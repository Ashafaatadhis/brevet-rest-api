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
    const user = req === null || req === void 0 ? void 0 : req.user;
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const search = req.query.search ? req.query.search : "";
    // if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    //   return res.status(401).json({ status: false, message: "Unauthorized" });
    // }
    if (user.role !== "SUPERADMIN") {
        const data = yield prisma_1.default.user.findMany({
            take: count,
            skip: count * (page - 1),
            select: {
                id: true,
                email: true,
                fullname: true,
                username: true,
                provider: true,
                image: true,
                phoneNumber: true,
                role: true,
                golongan: true,
                NPM: true,
                userCourses: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            where: {
                role: {
                    not: {
                        equals: "SUPERADMIN",
                    },
                },
                fullname: {
                    contains: search,
                },
                deletedAt: {
                    isSet: false,
                },
            },
        }); // if role admin
        const dataCount = yield prisma_1.default.user.count({
            where: {
                role: {
                    not: {
                        equals: "SUPERADMIN",
                    },
                },
                fullname: {
                    contains: search,
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        const hasNext = yield prisma_1.default.user.findMany({
            take: 1,
            skip: count * (page + 1 - 1),
            select: {
                id: true,
            },
            where: {
                fullname: {
                    contains: search,
                },
                role: {
                    not: {
                        equals: "SUPERADMIN",
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        }); // if role admin
        return res.json({
            status: 200,
            data,
            meta: { hasNextPage: hasNext.length > 0, count: dataCount },
        });
    }
    // if superadmin
    const data = yield prisma_1.default.user.findMany({
        take: count,
        skip: count * (page - 1),
        select: {
            id: true,
            email: true,
            fullname: true,
            username: true,
            provider: true,
            image: true,
            phoneNumber: true,
            role: true,
            golongan: true,
            NPM: true,
            userCourses: true,
            createdAt: true,
            updatedAt: true,
            _count: true,
            deletedAt: true,
        },
        where: {
            fullname: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    }); // if role admin
    const dataCount = yield prisma_1.default.user.count({
        where: {
            fullname: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    const hasNext = yield prisma_1.default.user.findMany({
        take: 1,
        skip: count * (page + 1 - 1),
        select: {
            id: true,
        },
        where: {
            fullname: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    }); // if role admin
    res.json({
        status: 200,
        data,
        meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
});
