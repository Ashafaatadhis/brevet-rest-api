import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export type BatchCourse = {
  id: string;
  course: string;
  batch: string;
  courseId: string;
  batchId: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const search: string = req.query.search ? (req.query.search as string) : "";
  try {
    const data = await prisma.batchCourse.findMany({
      take: count,
      select: {
        id: true,

        course: {
          select: {
            name: true,
            id: true,
          },
        },
        batch: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      skip: count * (page - 1),
      where: {
        OR: [
          {
            batch: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            course: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
        deletedAt: {
          isSet: false,
        },
      },
    });

    let newData: BatchCourse[] = [];
    data.map((value) => {
      newData.push({
        id: value.id,
        courseId: value.course.id,
        batchId: value.batch.id,
        course: value.course.name,
        batch: value.batch.name,
      });
    });

    const dataCount = await prisma.batchCourse.count({
      where: {
        OR: [
          {
            batch: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            course: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
        deletedAt: {
          isSet: false,
        },
      },
    });

    const hasNext = await prisma.batchCourse.findMany({
      take: 1,
      skip: count * (page + 1 - 1),

      where: {
        OR: [
          {
            batch: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            course: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
        deletedAt: {
          isSet: false,
        },
      },
    });

    return res.json({
      status: 200,
      data: newData,
      meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Batch Error occured" });
  }
};
