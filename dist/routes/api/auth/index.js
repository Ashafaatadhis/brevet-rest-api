"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_1 = __importDefault(require("../../../middleware/google/"));
const config_1 = __importDefault(require("../../../config/config"));
const router = express_1.default.Router();
let back = "";
router.get("/google", (req, res, next) => {
    back = req.query["back"];
    next();
}, google_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
router.get("/google/failure", (req, res, next) => {
    console.log("Ini");
    res.cookie("flash", "User not registered", {
        maxAge: 1000 * 5,
    });
    res.redirect(back);
});
router.get("/google/callback", google_1.default.authenticate("google", {
    session: false,
    // successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
}), (req, res, next) => {
    console.log("Masuk");
    const user = req.user;
    const accessToken = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
    }, config_1.default.secret.access_token_secret, {
        expiresIn: "30s",
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
    }, config_1.default.secret.refresh_token_secret, {
        expiresIn: "1d",
    });
    res.cookie("accessToken", accessToken, {
        // domain: config.callbackUrl,
        maxAge: 1000 * 30 /* 30s */,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config_1.default.env !== "development",
        maxAge: 60 * 60 * 24 * 1000, // 1 day
    });
    const p = `
    <html>
    <body>
    <script>
    window.location.href="${back}"
    </script>
    </body>
    </html>
    `;
    res.send(p);
});
exports.default = router;
