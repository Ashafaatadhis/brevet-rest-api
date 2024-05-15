import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const checkPayment = async (id: string, user: any) => {
  const data = await prisma.courseFile.findFirst({
    select: {
      courseFolder: {
        select: {
          course: {
            select: { id: true },
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
      courseId: data?.courseFolder.course.id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  const bukti = await prisma.payment.findMany({
    where: {
      userId: user.id,
      deletedAt: {
        isSet: false,
      },
      batchId: lemm?.batchId,
      status: {
        equals: "PAID",
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

    const data = await prisma.courseFile.findFirst({
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
