import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req?.user;

  try {
    const data = await prisma.user.findFirstOrThrow({
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
        id: user.id,
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
