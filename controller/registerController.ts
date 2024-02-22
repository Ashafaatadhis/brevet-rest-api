import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../config/prisma";
import { hashPassword } from "../utils/bcrypt";
import HttpError from "../utils/errors/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // in case request params meet the validation criteria
    console.log(req.body);
    const hashing = await hashPassword(req.body.password);
    if (!req.body.image) return next(new HttpError(400, "Image not found"));

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        fullname: req.body.email,
        image: req.body.image,
        password: hashing as string,
        username: req.body.username,
      },
    });
    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        fullname: user.fullname,
        image: user.image,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  res.status(422).json({ success: false, error: errors.array() });
};
