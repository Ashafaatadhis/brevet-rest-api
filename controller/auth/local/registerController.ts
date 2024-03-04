import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { hashPassword } from "../../../utils/bcrypt";
import HttpError from "../../../utils/errors/HttpError";
import uploadFile from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log("WOOOWW");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // in case request params meet the validation criteria

    const hashing = await hashPassword(req.body.password);

    const userExist = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        provider: "LOCAL",
        deletedAt: {
          isSet: false,
        },
      },
    });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }

    try {
      // const urlImage = await uploadFile(req, res, next);
      // req.body.image = urlImage;
      // if (!req.body.image) return next(new HttpError(400, "Image not found"));
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          fullname: req.body.fullname,
          password: hashing as string,
          username: req.body.username,
        },
        include: {
          userCourses: true,
        },
      });
      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          username: user.username,
          provider: user.provider,
          image: user.image,
          phoneNumber: user.phoneNumber,
          role: user.role,
          golongan: user.golongan,
          NPM: user.NPM,
          userCourses: user.userCourses,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt,
        },
      });
    } catch (err) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }
  }

  res.status(422).json({ success: false, error: errors.array() });
};
