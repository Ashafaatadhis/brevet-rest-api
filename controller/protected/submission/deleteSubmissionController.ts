import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req?.user;
  const id: string = req.params.id;
  if (!["ADMIN", "SUPERADMIN"].includes(user.role))
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    await prisma.submissionFile.update({
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

    return res.json({ success: true, message: "Success deleted course" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Failed Delete Course" });
  }
};
