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
      const findBatch = await prisma.batch.findUnique({
        where: {
          id: req.body.batchId,
          deletedAt: { isSet: false },
        },
      });

      if (!findBatch) {
        throw new Error("Not exist");
      }

      req.body.userId = user.id;
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
