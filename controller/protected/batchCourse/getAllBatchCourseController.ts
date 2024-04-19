import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  try {
    const data = await prisma.batchCourse.findMany({
      take: count,
      skip: count * (page - 1),
      where: {
        deletedAt: {
          isSet: false,
        },
      },
    });
    const dataCount = await prisma.batchCourse.count({
      where: {
        deletedAt: {
          isSet: false,
        },
      },
    });

    const hasNext = await prisma.batchCourse.findMany({
      take: 1,
      skip: count * (page + 1 - 1),
      where: {
        deletedAt: {
          isSet: false,
        },
      },
    });

    return res.json({
      status: 200,
      data,
      meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Batch Error occured" });
  }
};
