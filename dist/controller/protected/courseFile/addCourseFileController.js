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
const HttpError_1 = __importDefault(require("../../../utils/errors/HttpError"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (!["ADMIN", "SUPERADMIN"].includes(user.role))
            return res.status(401).json({ success: false, message: "Unauthorized" });
        try {
            const urlImage = yield (0, uploadFile_1.uploadMultiple)(req, "courseFile");
            if (!urlImage) {
                return next(new HttpError_1.default(404, "File not found"));
            }
            // if (!urlImage) {
            //   // req.body.image = thisUser.image;
            // } else {
            //   req.body.image = urlImage;
            // }
            // urlImage.forEach(async (value: any) => {
            //   req.body.name = value.originalName;
            //   req.body.file = value.link;
            const newData = urlImage.map((value) => {
                return Object.assign(Object.assign({}, value), { courseFolderId: req.body.courseFolderId });
            });
            const findCourseFolder = yield prisma_1.default.courseFolder.findUnique({
                where: {
                    id: req.body.courseFolderId,
                    deletedAt: { isSet: false },
                },
            });
            if (!findCourseFolder) {
                throw new Error("Not exist");
            }
            yield prisma_1.default.courseFile.createMany({
                data: [...newData],
            });
            return res.json({ success: true, message: "File success Uploaded" });
        }
        catch (err) {
            return res
                .status(400)
                .json({ success: false, message: "Failed Add Course Folder" });
        }
    }
    res.status(422).json({ success: false, error: errors.array() });
});
