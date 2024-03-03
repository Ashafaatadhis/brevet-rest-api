// import { Strategy as FacebookStrategy } from "passport-facebook";
// import passport from "passport";
// import config from "../../config/config";
// import prisma from "../../config/prisma";
// import { hashPassword } from "../../utils/bcrypt";
// import { VerifyCallback } from "jsonwebtoken";

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.facebook.facebook_app_id,
//       clientSecret: config.facebook.facebook_app_secret,
//       callbackURL: config.facebook.facebook_callback_url,
//       profileFields: ["id", "displayName", "photos", "email", "profileUrl"],
//     },
//     async function (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: (error: any, user?: any, info?: any) => void
//     ) {
//       console.log(profile);
//       return;
//       const email = profile.email;

//       if (!email) {
//         throw "User does not have email";
//       }

//       //   check if user already loggedin
//       const existingUser: any = await prisma.user.findFirst({
//         where: {
//           AND: {
//             email,
//             provider: "FACEBOOK",
//           },
//         },
//       });

//       if (existingUser) {
//         return done(null, existingUser);
//       } else {
//         // Build a new User
//         const genPassword = await hashPassword(
//           Math.random().toString(36).slice(2) +
//             Math.random().toString(36).toUpperCase().slice(2)
//         );
//         const user: any = await prisma.user.create({
//           data: {
//             email: profile.email,
//             fullname: profile.displayName,
//             username: profile.username,
//             image: profile.profileUrl,
//             password: genPassword as string,
//             provider: "GOOGLE",
//           },
//         });

//         return done("User created", user);
//       }
//     }
//   )
// );

// export default passport;
