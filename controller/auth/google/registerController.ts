import { NextFunction, Request, Response } from "express";
import HttpError from "../../../utils/errors/HttpError";
import prisma from "../../../config/prisma";
import jwt from "jsonwebtoken";
import config from "../../../config/config";
import axios from "axios";
import { hashPassword } from "../../../utils/bcrypt";

export default async (req: Request, res: Response, next: NextFunction) => {
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

  if (!data.email) {
    return res
      .status(400)
      .json({ success: false, message: "User does not have email" });
  }

  const existingUser: any = await prisma.user.findFirst({
    where: {
      AND: {
        email: data.email,
        provider: "GOOGLE",
        deletedAt: {
          isSet: false,
        },
      },
    },
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "User already exist" });
  }

  try {
    const genPassword = await hashPassword(
      Math.random().toString(36).slice(2) +
        Math.random().toString(36).toUpperCase().slice(2)
    );
    const user = await prisma.user.create({
      data: {
        email: data.email,
        fullname: data.given_name,
        password: genPassword as string,
        username: data.name,
        image: data.picture,
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
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  } catch (err) {
    return res
      .status(409)
      .json({ success: false, message: "User already exist" });
  }
};
