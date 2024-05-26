import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadSingle } from "../../../middleware/uploadFile";
import cloudinaryDelete from "../../../utils/deleteFiles";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      if (req.body.kuota) {
        req.body.kuota = parseInt(req.body.kuota);
      }
      const thisUser = await prisma.batch.findUnique({
        select: {
          image: true,
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      if (!thisUser) {
        return res.json({ success: true, message: "Data Not Found" });
      }

      const urlImage: any = await uploadSingle(req, "batch");

      if (!urlImage) {
        req.body.image = thisUser?.image;
      } else {
        if (!(await cloudinaryDelete(thisUser.image))) {
          return res.json({ success: true, message: "Data Not Found" });
        }
        req.body.image = urlImage.secure_url;
      }

      const data = await prisma.batch.update({
        data: {
          ...req.body,
          updatedAt: new Date().toISOString(),
        },
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
        .json({ success: false, message: "Failed Edit Batch" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
