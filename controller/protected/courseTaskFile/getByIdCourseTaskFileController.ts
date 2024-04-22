import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const checkPayment = async (id: string, user: any) => {
  const data = await prisma.courseTaskFile.findFirst({
    select: {
      courseTask: {
        select: {
          courseFolder: {
            select: {
              course: {
                select: { id: true },
              },
            },
          },
        },
      },
    },
    where: {
      id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  const lemm = await prisma.batchCourse.findFirst({
    where: {
      courseId: data?.courseTask.courseFolder.course.id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  const bukti = await prisma.userCourses.findMany({
    where: {
      userId: user.id,
      deletedAt: {
        isSet: false,
      },
      batchId: lemm?.batchId,
      payment: {
        every: {
          status: {
            equals: true,
          },
        },
      },
    },
  });

  return bukti.length;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const user: any = req.user;
  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      const paymentCheck = await checkPayment(id, user);
      if (!paymentCheck) {
        return res
          .status(400)
          .json({ success: false, message: "User not purchased this course" });
      }
    }

    const data = await prisma.courseTaskFile.findFirst({
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });
    return res.json({ success: true, data });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
