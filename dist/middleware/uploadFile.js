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
const HttpError_1 = __importDefault(require("../utils/errors/HttpError"));
const multer_1 = __importDefault(require("../config/multer"));
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
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield runMiddleware(req, res, multer_1.default.single("image"));
    if (!(req === null || req === void 0 ? void 0 : req.file))
        return next(new HttpError_1.default(400, "File not found"));
    console.log((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.buffer);
    const stream = cloudinary_1.default.uploader.upload_stream({
        folder: "user",
    }, (error, result) => {
        if (error)
            return console.error(error);
        req.body.image = result === null || result === void 0 ? void 0 : result.secure_url;
        next();
    });
    streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
});
