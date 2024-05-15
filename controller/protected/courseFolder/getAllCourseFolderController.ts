import { NextFunction, Request, Response } from "express";

import prisma from "../../../config/prisma";

const pagination = async (
  page: number,
  count: number,
  user: any,
  search: string
) => {
  const data = await prisma.courseFolder.findMany({
    take: count,
    skip: count * (page - 1),
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      deletedAt: {
        isSet: false,
      },
    },
    include: {
      courseTask: true,
      courseFile: true,
    },
  });
  const dataCount = await prisma.courseFolder.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  const hasNext = await prisma.courseFolder.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  return { data, dataCount, hasNext };
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const search: string = req.query.search ? (req.query.search as string) : "";
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  try {
    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { data, dataCount, hasNext } = await pagination(
      page,
      count,
      user,
      search
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
