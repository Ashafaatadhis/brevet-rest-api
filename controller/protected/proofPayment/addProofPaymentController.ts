import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadMultiple, uploadSingle } from "../../../middleware/uploadFile";
import HttpError from "../../../utils/errors/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    // if (!["ADMIN", "SUPERADMIN"].includes(user.role))
    //   return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const urlImage: any = await uploadSingle(req, "payment");

      if (!urlImage) {
        return next(new HttpError(404, "File not found"));
      }

      req.body.file = urlImage.secure_url;
      req.body.name = urlImage.name;

      const findPayment = await prisma.payment.findUnique({
        where: {
          id: req.body.paymentId,
          deletedAt: { isSet: false },
        },
      });

      if (!findPayment) {
        throw new Error("Not exist");
      }
      // const data = await prisma.proofPayment.create({
      //   data: req.body,
      // });
      const [data] = await prisma.$transaction([
        prisma.proofPayment.create({
          data: req.body,
        }),
        prisma.payment.update({
          where: {
            id: req.body.paymentId,
            deletedAt: {
              isSet: false,
            },
          },
          data: {
            status: "PENDING",
          },
        }),
      ]);

      return res.json({
        success: true,
        data,
        message: "File success Uploaded",
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Failed Add proof payment" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
