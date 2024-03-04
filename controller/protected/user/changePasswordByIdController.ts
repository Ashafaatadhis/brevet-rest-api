import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";

export default async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    // req.body["confirmPassword"] = undefined;

    if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
      if (id !== user.id) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
      }
    }

    const isExistUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!isExistUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (req.body.oldPassword) {
      if (
        !(await comparePassword(req.body.oldPassword, isExistUser.password))
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong Password" });
      }
    }

    await prisma.user.update({
      data: {
        password: (await hashPassword(req.body.password)) as string,
        updatedAt: new Date().toISOString(),
      },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    return res.json({
      success: true,
      message: "Password success changed",
    });
  }

  res.status(422).json({ success: false, error: errors.array() });
};
