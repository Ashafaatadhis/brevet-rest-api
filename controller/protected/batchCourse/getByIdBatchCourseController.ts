import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { BatchCourse } from "./getAllBatchCourseController";

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const by = req.query.by;

  try {
    const data = await prisma.batchCourse.findFirst({
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
      where: {
        ...(by === "batchId" ? { batchId: id } : { id }),
        deletedAt: {
          isSet: false,
        },
      },
    });

    let newData: Record<string, string> = {};
    if (data) {
      newData = {
        id: data.id,
        courseId: data.course.id,
        batchId: data.batch.id,
        course: data.course.name,
        batch: data.batch.name,
      };
    }

    return res.json({ success: true, data: newData });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
