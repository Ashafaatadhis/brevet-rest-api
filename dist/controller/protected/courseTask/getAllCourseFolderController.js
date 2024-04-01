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
const paginationAdmin = (page, count) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.courseFolder.findMany({
        take: count,
        skip: count * (page - 1),
        where: {
            deletedAt: {
                isSet: false,
            },
        },
        include: {
            courseFile: true,
        },
    });
    const dataCount = yield prisma_1.default.courseFolder.count({
        where: {
            deletedAt: {
                isSet: false,
            },
        },
    });
    const hasNext = yield prisma_1.default.courseFolder.findMany({
        take: 1,
        skip: count * (page + 1 - 1),
        where: {
            deletedAt: {
                isSet: false,
            },
        },
    });
    return { data, dataCount, hasNext };
});
const paginationUser = (page, count, user) => __awaiter(void 0, void 0, void 0, function* () {
    const getCoursePurchased = yield prisma_1.default.userCourses.findMany({
        select: {
            batchId: true,
        },
        where: {
            payment: {
                every: {
                    status: {
                        equals: true,
                    },
                },
            },
            userId: user.id,
            deletedAt: {
                isSet: false,
            },
        },
    });
    let data, dataCount = 0, hasNext = { length: 0 };
    for (const { batchId } of getCoursePurchased) {
        data = yield prisma_1.default.courseFolder.findMany({
            include: {
                courseFile: true,
            },
            where: {
                course: {
                    batchCourse: {
                        every: {
                            batchId,
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        dataCount = yield prisma_1.default.courseFolder.count({
            where: {
                course: {
                    batchCourse: {
                        every: {
                            batchId,
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
        hasNext = yield prisma_1.default.courseFolder.findMany({
            take: 1,
            skip: count * (page + 1 - 1),
            where: {
                course: {
                    batchCourse: {
                        every: {
                            batchId,
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
            },
        });
    }
    return { data, dataCount, hasNext };
});
const pagination = (page, count, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
        return yield paginationUser(page, count, user);
    }
    return yield paginationAdmin(page, count);
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    try {
        const { data, dataCount, hasNext } = yield pagination(page, count, user);
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
