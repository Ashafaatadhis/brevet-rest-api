import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadSingle } from "../../../middleware/uploadFile";
import HttpError from "../../../utils/errors/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;

    try {
      const urlImage: any = await uploadSingle(req, "payment");

      if (!urlImage) {
        return next(new HttpError(404, "File not found"));
      }

      // if (!urlImage) {
      //   // req.body.image = thisUser.image;
      // } else {
      //   req.body.image = urlImage;
      // }
      // urlImage.forEach(async (value: any) => {
      //   req.body.name = value.originalName;
      //   req.body.file = value.link;

      req.body.bukti_bayar = urlImage.secure_url;

      const newData = urlImage.map((value: any) => {
        return { ...value, courseFolderId: req.body.courseFolderId };
      });

      await prisma.payment.createMany({
        data: [...newData],
      });

      return res.json({ success: true, message: "File success Uploaded" });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed Add Course Folder" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
