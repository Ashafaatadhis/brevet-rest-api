import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

const superUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = await prisma.payment.findMany({
    include: {
      batch: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    where: {
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
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    superUser(req, res, next);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Payment Error occured" });
  }
};
