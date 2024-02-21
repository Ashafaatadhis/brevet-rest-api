import { v2 as cloudinary } from "cloudinary";
import config from "./config";
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
  secure: true,
});

export default cloudinary;
