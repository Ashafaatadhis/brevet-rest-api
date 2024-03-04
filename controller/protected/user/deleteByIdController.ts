import { Request, Response } from "express";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response) => {
  const user: any = req?.user;
  const id: string = req.params.id;

  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    // if user.role != admin
    if (id !== user.id) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
  }
  try {
    await prisma.user.update({
      data: {
        deletedAt: new Date().toISOString(),
      },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });
  } catch (err) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User success deleted" });
};
