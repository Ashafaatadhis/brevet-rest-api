import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const superUser = async (res: Response, id: string) => {
  const data = await prisma.course.findFirst({
    where: {
      id,
      deletedAt: {
        isSet: false,
      },
    },
    include: {
      courseFolder: {
        include: {
          courseFile: true,
        },
      },
    },
  });

  return res.json({ success: true, data });
};
const userBasic = async (res: Response, id: string) => {
  const data = await prisma.course.findFirst({
    where: {
      id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  return res.json({ success: true, data });
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const user: any = req.user;
  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      return userBasic(res, id);
    }

    return superUser(res, id);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course not exist" });
  }
};
