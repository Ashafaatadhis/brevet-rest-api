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
          status: {
            equals: true,
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
        deletedAt: {
          isSet: false,
        },
      },
      include: {
        courseFolder: {
          where: {
            deletedAt: {
              isSet: false,
            },
          },
          include: {
            courseFile: {
              where: {
                deletedAt: {
                  isSet: false,
                },
              },
            },
          },
        },
      },
    });
    res.json({ status: true, data });
  } catch (err) {
    res.status(404).json({ status: false, message: "Courses not found" });
  }
};
