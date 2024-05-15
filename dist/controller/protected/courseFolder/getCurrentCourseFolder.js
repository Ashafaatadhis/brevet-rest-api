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
const paginationUser = (page, pgCount, user, search) => __awaiter(void 0, void 0, void 0, function* () {
    const getCoursePurchased = yield prisma_1.default.payment.findMany({
        select: {
            batchId: true,
        },
        where: {
            status: {
                equals: "PAID",
            },
            userId: user.id,
            deletedAt: {
                isSet: false,
            },
        },
    });
    let data = [], dataCount = 0, hasNext = { length: 0 };
    for (const { batchId } of getCoursePurchased) {
        const newData = yield prisma_1.default.courseFolder.findMany({
            take: pgCount,
            skip: pgCount * (page - 1),
            include: {
                courseFile: true,
                courseTask: true,
            },
            where: {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
                course: {
                    batchCourse: {
                        some: {
                            batchId,
                            deletedAt: {
                                isSet: false,
                            },
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        data.push(...newData);
        const count = yield prisma_1.default.courseFolder.count({
            take: pgCount,
            skip: pgCount * (page - 1),
            where: {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
                course: {
                    batchCourse: {
                        some: {
                            batchId,
                            deletedAt: {
                                isSet: false,
                            },
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        dataCount += count;
        const dataNext = yield prisma_1.default.courseFolder.findMany({
            take: 1,
            skip: pgCount * (page + 1 - 1),
            where: {
                course: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                    batchCourse: {
                        some: {
                            batchId,
                            deletedAt: {
                                isSet: false,
                            },
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        hasNext.length += dataNext.length;
    }
    return { data, dataCount, hasNext };
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const search = req.query.search ? req.query.search : "";
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    try {
        const { data, dataCount, hasNext } = yield paginationUser(page, count, user, search);
        return res.json({
            status: 200,
            data,
            meta: { hasNextPage: hasNext.length > 0, count: dataCount },
        });
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Course Error occured" });
    }
});
