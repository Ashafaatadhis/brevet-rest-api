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

    await prisma.user.create({
      data: {
        email: req.body.email,
        fullname: req.body.email,
        image: req.body.image,
        password: hashing as string,
        username: req.body.username,
      },
    });
    return res.status(200).json({ success: true });
  }

  res.status(422).json({ success: false, error: errors.array() });
};
