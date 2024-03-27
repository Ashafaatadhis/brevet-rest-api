import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

const userBasic = async (
  res: Response,
  count: number,
  page: number,
  search: string
) => {
  const data = await prisma.course.findMany({
    take: count,
    skip: count * (page - 1),

    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });
  const dataCount = await prisma.course.count({
    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  const hasNext = await prisma.course.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });
  return res.json({
    status: 200,
    data,
    meta: { hasNextPage: hasNext.length > 0, count: dataCount },
  });
};

const superUser = async (
  res: Response,
  count: number,
  page: number,
  search: string
) => {
  const data = await prisma.course.findMany({
    take: count,
    skip: count * (page - 1),
    include: {
      courseFolder: {
        include: {
          courseFile: true,
        },
      },
    },
    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });
  const dataCount = await prisma.course.count({
    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  const hasNext = await prisma.course.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    where: {
      name: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });
  return res.json({
    status: 200,
    data,
    meta: { hasNextPage: hasNext.length > 0, count: dataCount },
  });
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const search: string = req.query.search ? (req.query.search as string) : "";
  const user: any = req.user;
  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      return userBasic(res, count, page, search);
    }

    return superUser(res, count, page, search);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Course Error occured" });
  }
};
