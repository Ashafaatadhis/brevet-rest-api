import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await prisma.batch.findMany({
      include: {
        batchCourse: {
          include: {
            course: {
              include: {
                teacher: {
                  select: {
                    createdAt: true,
                    deletedAt: true,
                    email: true,
                    fullname: true,
                    golongan: true,
                    id: true,
                    image: true,
                    NPM: true,
                    phoneNumber: true,
                    provider: true,
                    role: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        kuota: {
          gt: 0,
        },
        AND: [
          {
            start_register: {
              lte: new Date(),
            },
          },
          {
            end_register: {
              gte: new Date(),
            },
          },
        ],
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
