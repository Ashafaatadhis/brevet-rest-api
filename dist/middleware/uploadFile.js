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
exports.uploadMultiple = exports.uploadSingle = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
const uploadSingle = (req, folder) => __awaiter(void 0, void 0, void 0, function* () {
    // await runMiddleware(req, res, multer.single("image"));
    return new Promise((resolve, reject) => {
        if (!(req === null || req === void 0 ? void 0 : req.file)) {
            return resolve(false);
        }
        const stream = cloudinary_1.default.uploader.upload_stream({
            resource_type: "auto",
            folder,
        }, (error, result) => {
            var _a;
            if (error)
                return console.error(error);
            return resolve({
                secure_url: result === null || result === void 0 ? void 0 : result.secure_url,
                name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
            });
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    });
});
exports.uploadSingle = uploadSingle;
const uploadMultiple = (req, folder) => __awaiter(void 0, void 0, void 0, function* () {
    // await runMiddleware(req, res, multer.single("image"));
    return new Promise((resolve, reject) => {
        var _a;
        if (((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            return resolve(false);
        }
        if (Array.isArray(req.files)) {
            const newAll = [];
            req.files.forEach((file, index) => {
                const stream = cloudinary_1.default.uploader.upload_stream({
                    resource_type: "auto",
                    folder,
                }, (error, result) => {
                    var _a;
                    if (error)
                        return console.error(error);
                    newAll.push({
                        name: file.originalname,
                        file: result === null || result === void 0 ? void 0 : result.secure_url,
                    });
                    if (newAll.length == ((_a = req.files) === null || _a === void 0 ? void 0 : _a.length)) {
                        return resolve(newAll);
                    }
                });
                streamifier_1.default.createReadStream(file.buffer).pipe(stream);
            });
        }
        else {
            throw Error("Files Not Array");
        }
        // streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
});
exports.uploadMultiple = uploadMultiple;
exports.default = { uploadMultiple: exports.uploadMultiple, uploadSingle: exports.uploadSingle };
