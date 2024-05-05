import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

const paginationAdmin = async (
  page: number,
  count: number,
  by: any,
  id: string
) => {
  const data = await prisma.question.findMany({
    take: count,
    skip: count * (page - 1),
    where: {
      ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
      deletedAt: {
        isSet: false,
      },
    },
  });
  const dataCount = await prisma.question.count({
    where: {
      ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
      deletedAt: {
        isSet: false,
      },
    },
  });

  const hasNext = await prisma.question.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    where: {
      ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
      deletedAt: {
        isSet: false,
      },
    },
  });

  return { data, dataCount, hasNext };
};

const paginationUser = async (
  page: number,
  count: number,
  user: any,
  by: any,
  id: string
) => {
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
    data = await prisma.question.findMany({
      where: {
        ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
        pg: {
          courseFolder: {
            course: {
              id: courseId,
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });
    dataCount = await prisma.question.count({
      where: {
        ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
        pg: {
          courseFolder: {
            course: {
              id: courseId,
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });
    hasNext = await prisma.question.findMany({
      take: 1,
      skip: count * (page + 1 - 1),
      where: {
        ...(by === "courseTaskId" ? { courseTaskId: id } : { id }),
        pg: {
          courseFolder: {
            course: {
              id: courseId,
            },
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

const pagination = async (
  page: number,
  count: number,
  user: any,
  by: any,
  id: string
) => {
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return await paginationUser(page, count, user, by, id);
  }

  return await paginationAdmin(page, count, by, id);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const id: string = req.params.id;
  const by = req.query.by;
  try {
    const { data, dataCount, hasNext } = await pagination(
      page,
      count,
      user,
      by,
      id
    );

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
