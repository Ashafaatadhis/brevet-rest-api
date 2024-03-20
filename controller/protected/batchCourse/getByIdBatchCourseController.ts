import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const by = req.query.by;
  console.log("QO", by);
  //where batch id get by batchID

  const user: any = req.user;
  try {
    let data;
    if (!by) {
      data = await prisma.batchCourse.findFirst({
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });
    } else if (by === "batchId") {
      console.log("WOO");
      data = await prisma.batchCourse.findFirst({
        where: {
          batchId: id,
          deletedAt: {
            isSet: false,
          },
        },
      });
    }

    return res.json({ success: true, data });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
