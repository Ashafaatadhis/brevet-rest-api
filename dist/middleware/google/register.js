"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = require("../../utils/bcrypt");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const prisma_1 = __importDefault(require("../../config/prisma"));
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: "491150581406-1l7ofd2bboe4ks2ja5llm4fpse6kvkth.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/api/auth/google/callback",
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        //   console.log(
        //     "accessToken",
        //     accessToken,
        //     "refreshToken",
        //     refreshToken,
        //     "profile",
        //     profile
        //   );
        const email = profile.emails[0].value;
        if (!email) {
            return done("Login failed", null);
        }
        //   check if user already loggedin
        const existingUser = yield prisma_1.default.user.findFirst({
            where: {
                AND: {
                    email,
                    provider: "GOOGLE",
                },
            },
        });
        if (existingUser) {
            return done(null, existingUser);
        }
        else {
            // Build a new User
            const genPassword = yield (0, bcrypt_1.hashPassword)(Math.random().toString(36).slice(2) +
                Math.random().toString(36).toUpperCase().slice(2));
            const user = yield prisma_1.default.user.create({
                data: {
                    email: profile.email,
                    fullname: profile.given_name,
                    username: profile.displayName,
                    image: profile.picture,
                    password: genPassword,
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
    });
}));
exports.default = passport_1.default;
