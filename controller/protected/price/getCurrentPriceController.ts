import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req?.user;
    const data = await prisma.price.findMany({
      where: {
        type: user.golongan,
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
      .json({ success: false, message: "Batch Error occured" });
  }
};
