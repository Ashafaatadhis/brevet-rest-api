import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

const paginationAdmin = async (page: number, count: number) => {
  const data = await prisma.courseFile.findMany({
    where: {
      deletedAt: {
        isSet: false,
      },
    },
  });
  const dataCount = await prisma.courseFile.count({
    where: {
      deletedAt: {
        isSet: false,
      },
    },
  });
  const hasNext = await prisma.courseFile.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    where: {
      deletedAt: {
        isSet: false,
      },
    },
  });

  return { data, dataCount, hasNext };
};

const paginationUser = async (page: number, count: number, user: any) => {
  const getCoursePurchased = await prisma.payment.findMany({
    select: {
      courseId: true,
    },
    where: {
      status: {
        equals: true,
      },

      userId: user.id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  let data,
    dataCount = 0,
    hasNext = { length: 0 };

  for (const { courseId } of getCoursePurchased) {
    data = await prisma.courseFile.findMany({
      where: {
        courseFolder: {
          course: {
            id: courseId,
          },
        },

        deletedAt: {
          isSet: false,
        },
      },
    });
    dataCount = await prisma.courseFile.count({
      where: {
        courseFolder: {
          course: {
            id: courseId,
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });
    hasNext = await prisma.courseFile.findMany({
      take: 1,
      skip: count * (page + 1 - 1),
      where: {
        courseFolder: {
          course: {
            id: courseId,
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });
  }

  return { data, dataCount, hasNext };
};

const pagination = async (page: number, count: number, user: any) => {
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return await paginationUser(page, count, user);
  }

  return await paginationAdmin(page, count);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  try {
    const { data, dataCount, hasNext } = await pagination(page, count, user);
    return res.json({
      status: 200,
      data,
      meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course Error occured" });
  }
};
