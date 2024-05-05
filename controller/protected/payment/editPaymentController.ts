import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadSingle } from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const thisUser = await prisma.payment.findFirst({
        select: {
          bukti_bayar: true,
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });
      const urlImage: any = await uploadSingle(req, "payment");

      if (!urlImage) {
        req.body.bukti_bayar = thisUser?.bukti_bayar;
      } else {
        req.body.bukti_bayar = urlImage.secure_url;
      }

      const data = await prisma.payment.update({
        data: { ...req.body, updatedAt: new Date().toISOString() },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      return res.json({ success: true, data });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Failed Edit Payment" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
