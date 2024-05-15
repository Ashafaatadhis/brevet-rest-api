import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;

  try {
    const data = await prisma.proofPayment.findMany({
      where: {
        payment: {
          userId: user.id,
        },
        deletedAt: {
          isSet: false,
        },
      },
    });

    return res.json({
      status: 200,
      data,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course Error occured" });
  }
};
