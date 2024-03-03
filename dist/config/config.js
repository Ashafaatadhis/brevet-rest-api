"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const envVarsSchema = joi_1.default
    .object()
    .keys({
    NODE_ENV: joi_1.default
        .string()
        .valid("production", "development", "test")
        .required(),
    PORT: joi_1.default.number().positive().required(),
    ACCESS_TOKEN_SECRET: joi_1.default.string().required(),
    REFRESH_TOKEN_SECRET: joi_1.default.string().required(),
    SESSION_SECRET: joi_1.default.string().required(),
    GOOGLE_CLIENT_ID: joi_1.default.string().required(),
    GOOGLE_CLIENT_SECRET: joi_1.default.string().required(),
    GOOGLE_CALLBACK_URL: joi_1.default.string().required(),
    // FACEBOOK_APP_ID: joi.string().required(),
    // FACEBOOK_APP_SECRET: joi.string().required(),
    // FACEBOOK_CALLBACK_URL: joi.string().required(),
    CLOUDINARY_CLOUD_NAME: joi_1.default.string().required(),
    CLOUDINARY_API_KEY: joi_1.default.string().required(),
    CLOUDINARY_API_SECRET: joi_1.default.string().required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    secret: {
        access_token_secret: envVars.ACCESS_TOKEN_SECRET,
        refresh_token_secret: envVars.REFRESH_TOKEN_SECRET,
        session_secret: envVars.SESSION_SECRET,
    },
    google: {
        google_client_id: envVars.GOOGLE_CLIENT_ID,
        google_client_secret: envVars.GOOGLE_CLIENT_SECRET,
        google_callback_url: envVars.GOOGLE_CALLBACK_URL,
    },
    // facebook: {
    //   facebook_app_id: envVars.FACEBOOK_APP_ID,
    //   facebook_app_secret: envVars.FACEBOOK_APP_SECRET,
    //   facebook_callback_url: envVars.FACEBOOK_CALLBACK_URL,
    // },
    cloudinary: {
        cloudinary_cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: envVars.CLOUDINARY_API_KEY,
        cloudinary_api_secret: envVars.CLOUDINARY_API_SECRET,
    },
};
