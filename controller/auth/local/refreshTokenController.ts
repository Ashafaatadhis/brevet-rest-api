import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../../../utils/errors/HttpError";
import config from "../../../config/config";

export default async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.["refreshToken"];

  if (!refreshToken) {
    return next(new HttpError(401, "Token not valid"));
  }

  try {
    const decode: any = jwt.verify(
      refreshToken,
      config.secret.refresh_token_secret
    );
    // const newDecode = JSON.parse(decode as string);

    const accessToken = jwt.sign(
      {
        id: decode.id,
        username: decode.username,
        role: decode.role,
        email: decode.email,
      },
      config.secret.access_token_secret,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ status: true, accessToken });
  } catch (err: any) {
    res.clearCookie("refreshToken");
    return next(new HttpError(401, err.message));
  }
};
