import express, { Errback, NextFunction, Request, Response } from "express";
import routes from "./routes/api";
import cors from "cors";
import logger from "./middleware/logger";
import methodOverrider from "method-override";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import config from "./config/config";
import passport from "passport";

const app = express();

app.use(logger);
app.use(cors());
app.use(
  expressSession({
    secret: config.secret.session_secret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(methodOverrider());
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  const { start, httpStatus, message, previousError, stack, code }: any = err;

  res.status(code || httpStatus || 406).json({
    status: false,
    code: code || httpStatus || 406,
    message,
    data: previousError,
  });
});

// app.use(errorHandler);

export default app;
