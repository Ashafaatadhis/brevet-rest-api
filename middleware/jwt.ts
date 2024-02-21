import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

import jwt from "jsonwebtoken";

import { hashPassword } from "../utils/bcrypt";

import {
  Strategy as GoogleStrategy,
  VerifyCallback,
  VerifyFunctionWithRequest,
} from "passport-google-oauth2";

import passport from "passport";
import config from "../config/config";
import prisma from "../config/prisma";
import { Request } from "express";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret.access_token_secret,
} as StrategyOptionsWithoutRequest;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload);
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: jwt_payload.id,
        },
      });

      return done(null, user);
    } catch (err: any) {
      return done(err, false);
    }
  })
);

export default passport;
