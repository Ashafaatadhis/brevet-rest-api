import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const checkPayment = async (id: string, user: any) => {
  const data = await prisma.submissionFile.findFirst({
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

  const bukti = await prisma.payment.findMany({
    where: {
      userId: user.id,
      deletedAt: {
        isSet: false,
      },
      courseId: data?.courseTask.courseFolder.course.id,

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
  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      const paymentCheck = await checkPayment(id, user);
      if (!paymentCheck) {
        return res
          .status(400)
          .json({ success: false, message: "User not purchased this course" });
      }
    }
    console.log(id);
    const data = await prisma.submissionFile.findFirst({
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    console.log("DDD :", data);
    return res.json({ success: true, data });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
