import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const superUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = await prisma.payment.findMany({
    where: {
      deletedAt: {
        isSet: false,
      },
    },
  });

  return res.json({ success: true, data });
};
const basicUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
  user: any
) => {
  const data = await prisma.payment.findMany({
    where: {
      userCourses: {
        userId: user.id,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  return res.json({ success: true, data });
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return basicUser(req, res, next, user);
    // return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    superUser(req, res, next);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Payment Error occured" });
  }
};
