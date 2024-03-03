import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/errors/HttpError";

const errorHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      next(new HttpError(500, err));
    }
  };
};

export default errorHandler;
