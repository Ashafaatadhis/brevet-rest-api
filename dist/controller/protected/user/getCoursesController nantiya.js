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
    const courseId = req.params.courseId;
    const batchId = req.params.batchId;
    try {
        const isUserPurchased = yield prisma_1.default.userCourses.findFirst({
            where: {
                payment: {
                    every: {
                        status: {
                            equals: true,
                        },
                        deletedAt: {
                            isSet: false,
                        },
                    },
                },
                deletedAt: {
                    isSet: false,
                },
                userId: user.id,
                batchId,
            },
        });
        if (!isUserPurchased) {
            return res.json({ status: true, message: "User not purchased course" });
        }
        const data = yield prisma_1.default.course.findFirst({
            where: {
                id: courseId,
                deletedAt: {
                    isSet: false,
                },
            },
            include: {
                courseFolder: {
                    where: {
                        deletedAt: {
                            isSet: false,
                        },
                    },
                    include: {
                        courseFile: {
                            where: {
                                deletedAt: {
                                    isSet: false,
                                },
                            },
                        },
                    },
                },
            },
        });
        res.json({ status: true, data });
    }
    catch (err) {
        res.status(404).json({ status: false, message: "Courses not found" });
    }
});
