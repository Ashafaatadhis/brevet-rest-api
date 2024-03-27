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

      req.body.bukti_bayar = urlImage.secure_url;

      const data = await prisma.payment.create({
        data: req.body,
      });

      return res.json({ success: true, data });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Failed Add Payment" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
