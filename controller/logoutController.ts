import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ status: true, message: "User successfully logout" });
};
