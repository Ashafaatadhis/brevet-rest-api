import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";

import passport from "passport";
import config from "../config/config";
import prisma from "../config/prisma";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret.access_token_secret,
} as StrategyOptionsWithoutRequest;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("HIT", jwt_payload);
    // console.log(jwt_payload);
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: jwt_payload.id,
          deletedAt: {
            isSet: false,
          },
        },
      });

      return done(null, user);
    } catch (err: any) {
      return done(err, false);
    }
  })
);

export default passport;
