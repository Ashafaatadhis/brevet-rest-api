import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { deleteFiles } from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req?.user;
  const id: string = req.params.id;
  if (!["ADMIN", "SUPERADMIN"].includes(user.role))
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const dataBefore = await prisma.courseTaskFile.findFirst({
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    if (!dataBefore)
      return res.json({ success: true, message: "Data Not Found" });

    await prisma.courseTaskFile.update({
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

    await deleteFiles(dataBefore?.file);

    return res.json({ success: true, message: "Success deleted course" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Failed Delete Course" });
  }
};
