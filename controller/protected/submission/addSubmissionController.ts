import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadMultiple } from "../../../middleware/uploadFile";
import HttpError from "../../../utils/errors/HttpError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const urlImage: any = await uploadMultiple(req, "submission");

      if (!urlImage) {
        return next(new HttpError(404, "File not found"));
      }

      // if (!urlImage) {
      //   // req.body.image = thisUser.image;
      // } else {
      //   req.body.image = urlImage;
      // }
      // urlImage.forEach(async (value: any) => {
      //   req.body.name = value.originalName;
      //   req.body.file = value.link;
      console.log(urlImage);
      const newData = urlImage.map((value: any) => {
        return {
          ...value,
          courseTaskId: req.body.courseTaskId,
          taskId: req.body.taskId,
          userId: user.id,
        };
      });
      console.log(newData);
      await prisma.submissionFile.createMany({
        data: [...newData],
      });

      return res.json({ success: true, message: "File success Uploaded" });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed Upload File" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
