import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req?.user;
  const courseId: string = req.params.courseId;
  const batchId: string = req.params.batchId;
  try {
    const isUserPurchased = await prisma.userCourses.findFirst({
      where: {
        payment: {
          every: {
            status: {
              equals: true,
            },
            deletedAt: {
              isSet: false,
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
        userId: user.id,
        batchId,
      },
    });

    if (!isUserPurchased) {
      return res.json({ status: true, message: "User not purchased course" });
    }

    const data = await prisma.course.findFirst({
      where: {
        id: courseId,
        batchCourse: {
          every: {
            batchId: isUserPurchased.batchId,
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });

    const filecourse = await prisma.courseFile.findMany({
      where: {
        courseFolder: {
          courseId: data?.id,
        },
      },
    });
    res.json({ status: true, data: filecourse });
  } catch (err) {
    res.status(404).json({ status: false, message: "Courses not found" });
  }
};
