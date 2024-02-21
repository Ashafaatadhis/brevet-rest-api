import jwt from "jsonwebtoken";
import passport from "passport";

import { hashPassword } from "../../utils/bcrypt";

import {
  Strategy as GoogleStrategy,
  VerifyCallback,
  VerifyFunctionWithRequest,
} from "passport-google-oauth2";
import { Request } from "express";
import prisma from "../../config/prisma";
import config from "../../config/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.google_client_id,
      clientSecret: config.google.google_client_secret,
      callbackURL: config.google.google_callback_url,
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) {
      // console.log(
      //   "accessToken",
      //   accessToken,
      //   "refreshToken",
      //   refreshToken,
      //   "profile",
      //   profile
      // );

      const email = profile.emails![0].value;

      if (!email) {
        throw "User does not have email";
      }

      //   check if user already loggedin
      const existingUser: any = await prisma.user.findFirst({
        where: {
          AND: {
            email,
            provider: "GOOGLE",
          },
        },
      });

      if (existingUser) {
        return done(null, existingUser);
      } else {
        // Build a new User
        const genPassword = await hashPassword(
          Math.random().toString(36).slice(2) +
            Math.random().toString(36).toUpperCase().slice(2)
        );
        const user: any = await prisma.user.create({
          data: {
            email: profile.email,
            fullname: profile.given_name,
            username: profile.displayName,
            image: profile.picture,
            password: genPassword as string,
            provider: "GOOGLE",
          },
        });

        return done(null, user);
      }

      //   User.findOrCreate(
      //     { googleId: profile.id },
      //     function (err: any, user: any) {
      //       return done(err, user);
      //     }
      //   );
    }
  )
);

passport.serializeUser(function (user: Express.User, done) {
  done(null, user);
});
passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});

export default passport;
