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
const paginationAdmin = (page, count, by, id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.submissionFile.findMany({
        take: count,
        skip: count * (page - 1),
        where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { deletedAt: {
                isSet: false,
            } }),
    });
    const dataCount = yield prisma_1.default.submissionFile.count({
        where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { deletedAt: {
                isSet: false,
            } }),
    });
    const hasNext = yield prisma_1.default.submissionFile.findMany({
        take: 1,
        skip: count * (page + 1 - 1),
        where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { deletedAt: {
                isSet: false,
            } }),
    });
    return { data, dataCount, hasNext };
});
const paginationUser = (page, count, user, by, id) => __awaiter(void 0, void 0, void 0, function* () {
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
    let data, dataCount = 0, hasNext = { length: 0 };
    for (const { batchId } of getCoursePurchased) {
        data = yield prisma_1.default.submissionFile.findMany({
            where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { courseTask: {
                    courseFolder: {
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
                    },
                }, deletedAt: {
                    isSet: false,
                } }),
        });
        dataCount = yield prisma_1.default.submissionFile.count({
            where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { courseTask: {
                    courseFolder: {
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
                    },
                }, deletedAt: {
                    isSet: false,
                } }),
        });
        hasNext = yield prisma_1.default.submissionFile.findMany({
            take: 1,
            skip: count * (page + 1 - 1),
            where: Object.assign(Object.assign({}, (by === "courseTaskId" ? { courseTaskId: id } : { id })), { courseTask: {
                    courseFolder: {
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
                    },
                }, deletedAt: {
                    isSet: false,
                } }),
        });
    }
    return { data, dataCount, hasNext };
});
const pagination = (page, count, user, by, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
        return yield paginationUser(page, count, user, by, id);
    }
    return yield paginationAdmin(page, count, by, id);
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const id = req.params.id;
    const by = req.query.by;
    try {
        const { data, dataCount, hasNext } = yield pagination(page, count, user, by, id);
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
