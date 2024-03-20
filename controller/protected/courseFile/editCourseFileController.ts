import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { uploadMultiple, uploadSingle } from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const thisUser = await prisma.courseFile.findUnique({
        select: {
          file: true,
        },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });
      const urlImage: any = await uploadSingle(req, "courseFile");
      console.log(urlImage);
      if (!urlImage) {
        req.body.file = thisUser?.file;
      } else {
        req.body.file = urlImage.secure_url;
        req.body.name = urlImage.name;
      }

      const data = await prisma.courseFile.update({
        data: { ...req.body, updatedAt: new Date().toISOString() },
        where: {
          id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      return res.json({ success: true, data });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed Edit Course Folder" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
