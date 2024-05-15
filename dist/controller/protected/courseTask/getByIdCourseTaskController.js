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
const checkPayment = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.courseTask.findFirst({
        select: {
            courseFolder: {
                select: {
                    course: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
        where: {
            id,
            deletedAt: {
                isSet: false,
            },
        },
    });
    const lemm = yield prisma_1.default.batchCourse.findFirst({
        where: {
            courseId: data === null || data === void 0 ? void 0 : data.courseFolder.course.id,
            deletedAt: {
                isSet: false,
            },
        },
    });
    const bukti = yield prisma_1.default.payment.findMany({
        where: {
            userId: user.id,
            deletedAt: {
                isSet: false,
            },
            batchId: lemm === null || lemm === void 0 ? void 0 : lemm.batchId,
            status: {
                equals: "PAID",
            },
        },
    });
    return bukti.length;
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    // const by: string = req.query.by?.toString() ? req.query.by?.toString() : "";
    try {
        if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            const paymentCheck = yield checkPayment(id, user);
            if (!paymentCheck) {
                return res
                    .status(400)
                    .json({ success: false, message: "User not purchased this course" });
            }
        }
        const data = yield prisma_1.default.courseTask.findFirst({
            include: {
                courseTaskFile: true,
                submissionFile: true,
            },
            where: {
                id,
                deletedAt: {
                    isSet: false,
                },
            },
        });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Course not exist" });
    }
});
