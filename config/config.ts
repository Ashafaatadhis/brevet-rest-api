import dotenv from "dotenv";
import joi from "joi";
import path from "path";

dotenv.config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .required(),
    PORT: joi.number().positive().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
    SESSION_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
    CLOUDINARY_CLOUD_NAME: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
    CALLBACK_URL: joi.string().required().default("http://localhost/"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
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
  cloudinary: {
    cloudinary_cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: envVars.CLOUDINARY_API_KEY,
    cloudinary_api_secret: envVars.CLOUDINARY_API_SECRET,
  },
  callbackUrl: envVars.CALLBACK_URL,
};
