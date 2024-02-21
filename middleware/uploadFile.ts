import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/errors/HttpError";
import multer from "../config/multer";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

function runMiddleware(req: Request, res: Response, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async (req: Request, res: Response, next: NextFunction) => {
  await runMiddleware(req, res, multer.single("image"));
  if (!req?.file) return next(new HttpError(400, "File not found"));
  console.log(req?.file?.buffer);
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "user",
    },
    (error, result) => {
      if (error) return console.error(error);

      req.body.image = result?.secure_url;
      next();
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
};
