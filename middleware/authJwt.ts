import passport from "../middleware/jwt";
import HttpError from "../utils/errors/HttpError";
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (
      err: any,
      user?: Express.User | false | null,
      info?: object | string | Array<string | undefined>
    ) {
      if (err) return next(new HttpError(500, err.message));

      if (!user) {
        throw new HttpError(401, info?.toString());
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
