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
    try {
        const data = yield prisma_1.default.batch.findMany({
            include: {
                batchCourse: {
                    include: {
                        course: {
                            include: {
                                teacher: {
                                    select: {
                                        createdAt: true,
                                        deletedAt: true,
                                        email: true,
                                        fullname: true,
                                        golongan: true,
                                        id: true,
                                        image: true,
                                        NPM: true,
                                        phoneNumber: true,
                                        provider: true,
                                        role: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                kuota: {
                    gt: 0,
                },
                AND: [
                    {
                        start_register: {
                            lte: new Date(),
                        },
                    },
                    {
                        end_register: {
                            gte: new Date(),
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
            data,
        });
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, message: "Batch Error occured" });
    }
});
