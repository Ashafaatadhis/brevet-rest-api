import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

const checkPayment = async (id: string, user: any, by: string) => {
  const data = await prisma.courseFolder.findFirst({
    select: {
      course: {
        select: {
          id: true,
        },
      },
    },
    where: {
      ...(by === "courseId" ? { courseId: id } : { id }),

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
      courseId: data?.course.id,

      status: {
        equals: true,
      },
    },
  });

  return bukti.length;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const user: any = req.user;
  const by: string = req.query.by?.toString() ? req.query.by?.toString() : "";

  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      const paymentCheck = await checkPayment(id, user, by);
      if (!paymentCheck) {
        return res
          .status(400)
          .json({ success: false, message: "User not purchased this course" });
      }
    }

    const data = await prisma.courseFolder.findFirst({
      include: {
        courseTask: true,
        courseFile: true,
      },
      where: {
        ...(by === "courseId" ? { courseId: id } : { id }),
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
