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
const userBasic = (res, count, page, search) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.course.findMany({
        take: count,
        skip: count * (page - 1),
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    const dataCount = yield prisma_1.default.course.count({
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    const hasNext = yield prisma_1.default.course.findMany({
        take: 1,
        skip: count * (page + 1 - 1),
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    return res.json({
        status: 200,
        data,
        meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
});
const superUser = (res, count, page, search) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.course.findMany({
        take: count,
        skip: count * (page - 1),
        include: {
            courseFolder: {
                include: {
                    courseFile: true,
                },
            },
        },
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    const dataCount = yield prisma_1.default.course.count({
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    const hasNext = yield prisma_1.default.course.findMany({
        take: 1,
        skip: count * (page + 1 - 1),
        where: {
            name: {
                contains: search,
            },
            deletedAt: {
                isSet: false,
            },
        },
    });
    return res.json({
        status: 200,
        data,
        meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const search = req.query.search ? req.query.search : "";
    const user = req.user;
    try {
        if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            return userBasic(res, count, page, search);
        }
        return superUser(res, count, page, search);
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Course Error occured" });
    }
});
