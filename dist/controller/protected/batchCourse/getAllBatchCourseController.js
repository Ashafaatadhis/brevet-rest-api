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
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const search = req.query.search ? req.query.search : "";
    try {
        const data = yield prisma_1.default.batchCourse.findMany({
            take: count,
            select: {
                id: true,
                course: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
                batch: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            skip: count * (page - 1),
            where: {
                OR: [
                    {
                        batch: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        course: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
                deletedAt: {
                    isSet: false,
                },
            },
        });
        let newData = [];
        data.map((value) => {
            newData.push({
                id: value.id,
                courseId: value.course.id,
                batchId: value.batch.id,
                course: value.course.name,
                batch: value.batch.name,
            });
        });
        const dataCount = yield prisma_1.default.batchCourse.count({
            where: {
                OR: [
                    {
                        batch: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        course: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
                deletedAt: {
                    isSet: false,
                },
            },
        });
        const hasNext = yield prisma_1.default.batchCourse.findMany({
            take: 1,
            skip: count * (page + 1 - 1),
            where: {
                OR: [
                    {
                        batch: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        course: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
                deletedAt: {
                    isSet: false,
                },
            },
        });
        return res.json({
            status: 200,
            data: newData,
            meta: { hasNextPage: hasNext.length > 0, count: dataCount },
        });
    }
    catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ success: false, message: "Batch Error occured" });
    }
});
