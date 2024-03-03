import multer from "multer";
import path from "path";

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

const storage = multer.memoryStorage();

export default multer({
  storage,
});
