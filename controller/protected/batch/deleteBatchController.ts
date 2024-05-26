import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import cloudinaryDelete from "../../../utils/deleteFiles";

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req?.user;
  const id: string = req.params.id;
  if (!["ADMIN", "SUPERADMIN"].includes(user.role))
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const dataBefore = await prisma.batch.findFirst({
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    if (!dataBefore)
      return res.json({ success: true, message: "Data Not Found" });

    if (!(await cloudinaryDelete(dataBefore.image))) {
      return res.json({ success: true, message: "Data Not Found" });
    }
    await prisma.batch.update({
      data: {
        deletedAt: new Date().toISOString(),
      },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    return res.json({ success: true, message: "Success deleted Batch" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Failed Delete Batch" });
  }
};
