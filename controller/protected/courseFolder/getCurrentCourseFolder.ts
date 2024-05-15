import { NextFunction, Request, Response } from "express";
import prisma from "../../../config/prisma";
const paginationUser = async (
  page: number,
  pgCount: number,
  user: any,
  search: string
) => {
  const getCoursePurchased = await prisma.payment.findMany({
    select: {
      batchId: true,
    },
    where: {
      status: {
        equals: "PAID",
      },

      userId: user.id,
      deletedAt: {
        isSet: false,
      },
    },
  });

  let data: any[] = [],
    dataCount = 0,
    hasNext = { length: 0 };

  for (const { batchId } of getCoursePurchased) {
    const newData = await prisma.courseFolder.findMany({
      take: pgCount,
      skip: pgCount * (page - 1),
      include: {
        courseFile: true,
        courseTask: true,
      },
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        course: {
          batchCourse: {
            some: {
              batchId,
              deletedAt: {
                isSet: false,
              },
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });

    data.push(...newData);

    const count = await prisma.courseFolder.count({
      take: pgCount,
      skip: pgCount * (page - 1),

      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        course: {
          batchCourse: {
            some: {
              batchId,
              deletedAt: {
                isSet: false,
              },
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });

    dataCount += count;
    const dataNext = await prisma.courseFolder.findMany({
      take: 1,
      skip: pgCount * (page + 1 - 1),

      where: {
        course: {
          name: {
            contains: search,
            mode: "insensitive",
          },
          batchCourse: {
            some: {
              batchId,
              deletedAt: {
                isSet: false,
              },
            },
          },
        },
        deletedAt: {
          isSet: false,
        },
      },
    });
    hasNext.length += dataNext.length;
  }

  return { data, dataCount, hasNext };
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const search: string = req.query.search ? (req.query.search as string) : "";
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  try {
    const { data, dataCount, hasNext } = await paginationUser(
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
