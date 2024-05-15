"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./middleware/logger"));
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("./config/config"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use(logger_1.default);
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000", "https://tax-center-brevet.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Accept",
        "x-client-key",
        "x-client-token",
        "x-client-secret",
        "Authorization",
    ],
}));
app.use((0, express_session_1.default)({
    secret: config_1.default.secret.session_secret,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", api_1.default);
app.use((0, method_override_1.default)());
app.use((err, req, res, next) => {
    const { start, httpStatus, message, previousError, stack, code } = err;
    res.status(code || httpStatus || 406).json({
        status: false,
        code: code || httpStatus || 406,
        message,
        data: previousError,
    });
});
// app.use(errorHandler);
exports.default = app;
