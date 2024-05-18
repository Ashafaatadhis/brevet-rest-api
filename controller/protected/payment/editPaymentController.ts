import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
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
      let data;
      const checkPayment = await prisma.payment.findFirst({
        select: {
          batchId: true,
          status: true,
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      // jika req.body.status nya paid dan status pembayarannya belum paid
      if (req.body.status == "PAID" && checkPayment?.status !== "PAID") {
        //jika batch sudah penuh

        const currentBatch = await prisma.batch.findFirst({
          select: {
            kuota: true,
          },
          where: {
            id: checkPayment?.batchId,
          },
        });

        if (currentBatch?.kuota == 0) {
          return res
            .status(400)
            .json({ success: false, message: "Quota is fulfilled" });
        }

        const [transact] = await prisma.$transaction([
          prisma.payment.update({
            data: { ...req.body, updatedAt: new Date().toISOString() },
            where: {
              id,
              deletedAt: {
                isSet: false,
              },
            },
          }),
          prisma.batch.update({
            where: { id: checkPayment?.batchId },
            data: {
              kuota: {
                decrement: 1,
              },
            },
          }),
        ]);

        data = transact;
      } else {
        data = await prisma.payment.update({
          data: { ...req.body, updatedAt: new Date().toISOString() },
          where: {
            id,
            deletedAt: {
              isSet: false,
            },
          },
        });
      }

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
