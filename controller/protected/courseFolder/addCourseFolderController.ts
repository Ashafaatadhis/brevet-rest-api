import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const findCourse = await prisma.course.findUnique({
        where: {
          id: req.body.courseId,
          deletedAt: { isSet: false },
        },
      });

      if (!findCourse) {
        throw new Error("Not exist");
      }

      const data = await prisma.courseFolder.create({
        data: req.body,
      });

      return res.json({ success: true, data });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed Add Course Folder" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
