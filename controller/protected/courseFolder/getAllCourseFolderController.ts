import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.courseFolder.findMany({
      where: {
        deletedAt: {
          isSet: false,
        },
      },
      include: {
        courseFile: true,
      },
    });

    return res.json({ success: true, data });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course Error occured" });
  }
};
