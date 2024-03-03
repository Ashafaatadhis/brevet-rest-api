import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  try {
    const data = await prisma.course.findFirst({
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
      include: {
        batch: true,
      },
    });

    return res.json({ success: true, data });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
