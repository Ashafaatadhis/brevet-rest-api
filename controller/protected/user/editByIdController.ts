import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { hashPassword } from "../../../utils/bcrypt";
import { uploadSingle } from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    // req.body["confirmPassword"] = undefined;

    if (["ADMIN", "SUPERADMIN"].includes(user.role)) {
      const thisUser = await prisma.user.findUnique({
        select: {
          provider: true,
          image: true,
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      if (thisUser?.provider !== "LOCAL") {
        return res
          .status(400)
          .json({ success: false, message: "This User can't be update" });
      }
      //   req.body["password"] = (await hashPassword(req.body.password)) as string;
      const urlImage: any = await uploadSingle(req, "user");

      if (!urlImage) {
        req.body.image = thisUser.image;
      } else {
        req.body.image = urlImage.secure_url;
      }

      const data = await prisma.user.update({
        data: {
          ...req.body,
          updatedAt: new Date().toISOString(),
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });
      return res.json({ success: true, data });
    } // if user.role admin

    // if user.role != admin
    if (id !== user.id) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const thisUser = await prisma.user.findUnique({
      select: {
        provider: true,
        image: true,
        role: true,
      },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });

    if (thisUser?.provider !== "LOCAL") {
      return res
        .status(400)
        .json({ success: false, message: "This User can't be update" });
    }
    const urlImage: any = await uploadSingle(req, "user");

    if (!urlImage) {
      req.body.image = thisUser.image;
    } else {
      req.body.image = urlImage.secure_url;
    }
    req.body.role = thisUser.role;
    const data = await prisma.user.update({
      data: { ...req.body, updatedAt: new Date().toISOString() },
      where: {
        id,
        deletedAt: {
          isSet: false,
        },
      },
    });
    return res.json({ success: true, data });
  } // if error.isempty
  // console.log(req.body);
  res.status(422).json({ success: false, error: errors.array() });
};
