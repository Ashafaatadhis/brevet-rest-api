import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req?.user;
  const id: string = req.params.id;
  try {
    if (["ADMIN", "SUPERADMIN"].includes(user.role)) {
      const data = await prisma.user.findFirstOrThrow({
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
          id,
          deletedAt: {
            isSet: false,
          },
        },
      }); // if role admin
      res.json({ status: 200, data });
    }

    if (user.id !== id) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const data = await prisma.user.findFirstOrThrow({
      select: {
        id: true,
        email: true,
        fullname: true,
        username: true,
        password: false,
        provider: false,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });
    return res.json({ status: 200, data });
  } catch (err) {
    res.status(404).json({ status: false, message: "User not found" });
  }
};
