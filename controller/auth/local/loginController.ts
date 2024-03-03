import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import jwt from "jsonwebtoken";
import { comparePassword } from "../../../utils/bcrypt";
import config from "../../../config/config";
import HttpError from "../../../utils/errors/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // if (req.cookies?.["refreshToken"]) {
    //   return next(new HttpError(200, "User has been logged in"));
    // }
    // in case request params meet the validation criteria

    try {
      const isExistUser = await prisma.user.findFirstOrThrow({
        where: {
          username: req.body.username,
          deletedAt: {
            isSet: false,
          },
        },
      });

      //   if password correct
      if (await comparePassword(req.body.password, isExistUser.password)) {
        const accessToken = jwt.sign(
          {
            id: isExistUser.id,
            username: isExistUser.username,
            role: isExistUser.role,
            email: isExistUser.email,
          },
          config.secret.access_token_secret,
          {
            expiresIn: "30s",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: isExistUser.id,
            username: isExistUser.username,
            role: isExistUser.role,
            email: isExistUser.email,
          },
          config.secret.refresh_token_secret,
          {
            expiresIn: "1d",
          }
        );

        res.cookie("refreshToken", refreshToken, {
          sameSite: config.env !== "development" ? "none" : "lax",
          httpOnly: true,
          // secure: true,
          secure: config.env !== "development",
          maxAge: 60 * 60 * 24 * 1000, // 1 day
        });

        return res.status(200).json({
          success: true,
          accessToken,
          data: {
            id: isExistUser.id,
            username: isExistUser.username,
            role: isExistUser.role,
            email: isExistUser.email,
            fullname: isExistUser.fullname,
            image: isExistUser.image,
            created_at: isExistUser.createdAt,
            updated_at: isExistUser.updatedAt,
            deletedAt: isExistUser.deletedAt,
          },
        });
      }
    } catch (err: any) {
      console.log(err);
      return next(new HttpError(400, "username / password incorrect"));
    }
    console.log("WOI");
    return res
      .status(400)
      .json({ success: false, message: "username / password incorrect" });
  }

  res.status(422).json({ success: false, error: errors.array() });
};
