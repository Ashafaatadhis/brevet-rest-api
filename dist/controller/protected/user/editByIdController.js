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
const express_validator_1 = require("express-validator");
const prisma_1 = __importDefault(require("../../../config/prisma"));
const uploadFile_1 = require("../../../middleware/uploadFile");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        const id = req.params.id;
        // req.body["confirmPassword"] = undefined;
        if (["ADMIN", "SUPERADMIN"].includes(user.role)) {
            const thisUser = yield prisma_1.default.user.findUnique({
                select: {
                    provider: true,
                    image: true,
                },
                where: {
                    id,
                    deletedAt: {
                        isSet: false,
                    },
                },
            });
            if ((thisUser === null || thisUser === void 0 ? void 0 : thisUser.provider) !== "LOCAL") {
                return res
                    .status(400)
                    .json({ success: false, message: "This User can't be update" });
            }
            //   req.body["password"] = (await hashPassword(req.body.password)) as string;
            const urlImage = yield (0, uploadFile_1.uploadSingle)(req, "user");
            if (!urlImage) {
                req.body.image = thisUser.image;
            }
            else {
                req.body.image = urlImage.secure_url;
            }
            const data = yield prisma_1.default.user.update({
                data: Object.assign(Object.assign({}, req.body), { updatedAt: new Date().toISOString() }),
                where: {
                    id,
                    deletedAt: {
                        isSet: false,
                    },
                },
            });
            return res.json({ success: true, data });
        } // if user.role admin
        // if user.role != admin
        if (id !== user.id) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        const thisUser = yield prisma_1.default.user.findUnique({
            select: {
                provider: true,
                image: true,
                role: true,
            },
            where: {
                id,
                deletedAt: {
                    isSet: false,
                },
            },
        });
        if ((thisUser === null || thisUser === void 0 ? void 0 : thisUser.provider) !== "LOCAL") {
            return res
                .status(400)
                .json({ success: false, message: "This User can't be update" });
        }
        const urlImage = yield (0, uploadFile_1.uploadSingle)(req, "user");
        if (!urlImage) {
            req.body.image = thisUser.image;
        }
        else {
            req.body.image = urlImage.secure_url;
        }
        req.body.role = thisUser.role;
        const data = yield prisma_1.default.user.update({
            data: Object.assign(Object.assign({}, req.body), { updatedAt: new Date().toISOString() }),
            where: {
                id,
                deletedAt: {
                    isSet: false,
                },
            },
        });
        return res.json({ success: true, data });
    } // if error.isempty
    // console.log(req.body);
    res.status(422).json({ success: false, error: errors.array() });
});
