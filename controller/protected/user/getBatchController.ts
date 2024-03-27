import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req.user;

  try {
    const data = await prisma.userCourses.findMany({
      where: {
        deletedAt: {
          isSet: false,
        },
        userId: user.id,
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
      },
    });

    res.json({ status: true, data });
  } catch (err) {
    res.status(404).json({ status: false, message: "Courses not found" });
  }
};
