import { check } from "express-validator";

export const registerValidator = [
  check("fullname", "Invalid does not Empty").not().isEmpty(),
  check("username", "Invalid does not Empty").not().isEmpty(),
  //   check("image", "Invalid does not Empty").not().isEmpty(),
  //   check("image", "Format file is not allowed").custom((value, { req }) => {
  //     if (!req?.file?.mimetype) {
  //       return false;
  //     }
  //     if (
  //       req.file.mimetype == "image/png" ||
  //       req.file.mimetype == "image/jpg" ||
  //       req.file.mimetype == "image/jpeg"
  //     ) {
  //       const mimetype = req.file.mimetype as string;
  //       return "." + mimetype.split("/")[1]; // return "non-falsy" value to indicate valid data"
  //     } else {
  //       return false; // return "falsy" value to indicate invalid data
  //     }
  //   }),
  check("email", "Invalid does not Empty").not().isEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Invalid does not Empty").not().isEmpty(),
  check("password", "Password must be between 4 to 16 characters").isLength({
    min: 4,
    max: 16,
  }),
  check("confirmPassword")
    .isLength({
      min: 4,
      max: 16,
    })
    .withMessage("Password must be between 4 to 16 characters")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    }),
];

export const loginValidator = [
  check("username", "Invalid does not Empty").not().isEmpty(),
  //   check("image", "Invalid does not Empty").not().isEmpty(),
  //   check("image", "Format file is not allowed").custom((value, { req }) => {
  //     if (!req?.file?.mimetype) {
  //       return false;
  //     }
  //     if (
  //       req.file.mimetype == "image/png" ||
  //       req.file.mimetype == "image/jpg" ||
  //       req.file.mimetype == "image/jpeg"
  //     ) {
  //       const mimetype = req.file.mimetype as string;
  //       return "." + mimetype.split("/")[1]; // return "non-falsy" value to indicate valid data"
  //     } else {
  //       return false; // return "falsy" value to indicate invalid data
  //     }
  //   }),
  check("password", "Invalid does not Empty").not().isEmpty(),
  check("password", "Password must be between 4 to 16 characters").isLength({
    min: 4,
    max: 16,
  }),
];
