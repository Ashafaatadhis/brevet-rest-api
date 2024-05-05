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
const checkPayment = (id, user, by) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.courseFolder.findFirst({
        select: {
            course: {
                select: {
                    id: true,
                },
            },
        },
        where: Object.assign(Object.assign({}, (by === "courseId" ? { courseId: id } : { id })), { deletedAt: {
                isSet: false,
            } }),
    });
    const bukti = yield prisma_1.default.payment.findMany({
        where: {
            userId: user.id,
            deletedAt: {
                isSet: false,
            },
            courseId: data === null || data === void 0 ? void 0 : data.course.id,
            status: {
                equals: true,
            },
        },
    });
    return bukti.length;
});
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = req.params.id;
    const user = req.user;
    const by = ((_a = req.query.by) === null || _a === void 0 ? void 0 : _a.toString()) ? (_b = req.query.by) === null || _b === void 0 ? void 0 : _b.toString() : "";
    try {
        if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            const paymentCheck = yield checkPayment(id, user, by);
            if (!paymentCheck) {
                return res
                    .status(400)
                    .json({ success: false, message: "User not purchased this course" });
            }
        }
        const data = yield prisma_1.default.courseFolder.findFirst({
            include: {
                courseTask: true,
                courseFile: true,
            },
            where: Object.assign(Object.assign({}, (by === "courseId" ? { courseId: id } : { id })), { deletedAt: {
                    isSet: false,
                } }),
        });
        return res.json({ success: true, data });
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Course not exist" });
    }
});
