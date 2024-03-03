"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// const diskStorage = multer.diskStorage({
//   destination: path.resolve(__dirname, "../", "public/uploads"),
//   filename(
//     req: Express.Request,
//     file: Express.Multer.File,
//     fn: (error: Error | null, filename: string) => void
//   ): void {
//     fn(
//       null,
//       `${new Date().getTime().toString()}-${file.fieldname}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });
const storage = multer_1.default.memoryStorage();
exports.default = (0, multer_1.default)({
    storage,
});
