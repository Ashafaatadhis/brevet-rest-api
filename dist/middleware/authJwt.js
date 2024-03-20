"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../middleware/jwt"));
const HttpError_1 = __importDefault(require("../utils/errors/HttpError"));
exports.default = (req, res, next) => {
    jwt_1.default.authenticate("jwt", {
        session: false,
    }, function (err, user, info) {
        if (err)
            return next(new HttpError_1.default(500, err.message));
        console.log(user);
        if (!user) {
            throw new HttpError_1.default(401, info === null || info === void 0 ? void 0 : info.toString());
        }
        req.user = user;
        next();
    })(req, res, next);
};
