import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  const user: any = req?.user;
  console.log(user);
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  if (user.role === "ADMIN") {
    const data = await prisma.user.findMany({
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
        deletedAt: {
          isSet: false,
        },
      },
    }); // if role admin
    res.json({ status: 200, data });
  }
  const data = await prisma.user.findMany({
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
      deletedAt: {
        isSet: false,
      },
    },
  }); // if role admin
  res.json({ status: 200, data });
};
