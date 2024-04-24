import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import { deleteFiles, uploadSingle } from "../../../middleware/uploadFile";

export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const user: any = req?.user;
    const id: string = req.params.id;
    if (!["ADMIN", "SUPERADMIN"].includes(user.role))
      return res.status(401).json({ success: false, message: "Unauthorized" });
    try {
      const thisUser = await prisma.submissionFile.findUnique({
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

      const urlImage: any = await uploadSingle(req, "submission");

      if (!urlImage) {
        req.body.file = thisUser?.file;
      } else {
        if (thisUser) await deleteFiles(thisUser?.file);
        req.body.file = urlImage.secure_url;
        req.body.name = urlImage.name;
      }

      const data = await prisma.submissionFile.update({
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
        .json({ success: false, message: "Failed Edit File" });
    }
  }
  res.status(422).json({ success: false, error: errors.array() });
};
