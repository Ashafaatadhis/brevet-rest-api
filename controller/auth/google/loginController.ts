import { NextFunction, Request, Response } from "express";
import HttpError from "../../../utils/errors/HttpError";
import prisma from "../../../config/prisma";
import jwt from "jsonwebtoken";
import config from "../../../config/config";
import axios from "axios";

export default async (req: Request, res: Response, next: NextFunction) => {
  // if (req.cookies?.["refreshToken"]) {
  //   return next(new HttpError(200, "User has been logged in"));
  // }

  const token = req.headers["authorization"]?.split(" ")[1];

  try {
    var { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    return next(new HttpError(400, "Token Invalid"));
  }
  // in case request params meet the validation criteria

  try {
    const isExistUser = await prisma.user.findFirstOrThrow({
      where: {
        username: data.name,
        deletedAt: {
          isSet: false,
        },
      },
    });

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
      httpOnly: true,
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
  } catch (err: any) {
    console.log(err);
    return next(new HttpError(400, "username / password incorrect"));
  }
};
