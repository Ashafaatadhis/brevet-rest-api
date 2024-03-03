import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  const user: any = req?.user;
  console.log(user);
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
  const data = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullname: true,
      username: true,
      password: false,
      provider: false,
      image: true,
      role: true,
      NPM: true,
      phoneNumber: true,
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
