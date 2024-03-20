import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req?.user;
  const count = req.query.count ? parseInt(req.query.count as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const search: string = req.query.search ? (req.query.search as string) : "";

  // if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
  //   return res.status(401).json({ status: false, message: "Unauthorized" });
  // }

  if (user.role !== "SUPERADMIN") {
    const data = await prisma.user.findMany({
      take: count,
      skip: count * (page - 1),
      select: {
        id: true,
        email: true,
        fullname: true,
        username: true,
        provider: true,
        image: true,
        phoneNumber: true,
        role: true,
        golongan: true,

        NPM: true,
        userCourses: true,
        createdAt: true,
        updatedAt: true,

        deletedAt: true,
      },
      where: {
        role: {
          not: {
            equals: "SUPERADMIN",
          },
        },
        fullname: {
          contains: search,
        },
        deletedAt: {
          isSet: false,
        },
      },
    }); // if role admin

    const dataCount = await prisma.user.count({
      where: {
        role: {
          not: {
            equals: "SUPERADMIN",
          },
        },
        fullname: {
          contains: search,
        },
        deletedAt: {
          isSet: false,
        },
      },
    });

    const hasNext = await prisma.user.findMany({
      take: 1,
      skip: count * (page + 1 - 1),
      select: {
        id: true,
      },
      where: {
        fullname: {
          contains: search,
        },
        role: {
          not: {
            equals: "SUPERADMIN",
          },
        },

        deletedAt: {
          isSet: false,
        },
      },
    }); // if role admin
    return res.json({
      status: 200,
      data,
      meta: { hasNextPage: hasNext.length > 0, count: dataCount },
    });
  }

  // if superadmin

  const data = await prisma.user.findMany({
    take: count,
    skip: count * (page - 1),

    select: {
      id: true,
      email: true,
      fullname: true,
      username: true,
      provider: true,
      image: true,
      phoneNumber: true,
      role: true,
      golongan: true,
      NPM: true,
      userCourses: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
      deletedAt: true,
    },
    where: {
      fullname: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  }); // if role admin

  const dataCount = await prisma.user.count({
    where: {
      fullname: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  });

  const hasNext = await prisma.user.findMany({
    take: 1,
    skip: count * (page + 1 - 1),
    select: {
      id: true,
    },

    where: {
      fullname: {
        contains: search,
      },
      deletedAt: {
        isSet: false,
      },
    },
  }); // if role admin

  res.json({
    status: 200,
    data,
    meta: { hasNextPage: hasNext.length > 0, count: dataCount },
  });
};
