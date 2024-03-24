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

      const count = await prisma.userCourses.findMany({
        where: {
          deletedAt: {
            isSet: false,
          },
          batchId: req.body.batchId,
          payment: {
            status: {
              equals: true,
            },
          },
        },
      });

      const batchKuota = await prisma.batch.findFirst({
        select: {
          kuota: true,
        },
        where: {
          id: req.body.batchId,
        },
      });

      const kuota = batchKuota?.kuota ? batchKuota?.kuota : 0;

      const dataUserCourses = await prisma.userCourses.create({
        data: {
          batchId: req.body.batchId,
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      // kuota is terpenuhi
      if (!(count.length < kuota)) {
        return res.json({
          success: false,
          message: "Quota Batch is fulfilled",
        });
      }

      await prisma.payment.create({
        data: {
          atas_nama: req.body.atas_nama,
          bank: req.body.bank,
          bukti_bayar: urlImage.secure_url,
          no_rek: req.body.no_rek,
          userCoursesId: dataUserCourses.id,
        },
      });
      return res.json({ success: true, message: "Success Created" });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Failed Add User Course" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
