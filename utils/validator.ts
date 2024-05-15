import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

export const addBatchValidator = [
  check("name", "Invalid does not Empty").not().isEmpty(),
  check("courseId", "Invalid does not Empty").not().isEmpty(),
  check("start_register", "Invalid does not Empty").not().isEmpty(),
  check("start_register", "Invalid format Date").isISO8601().toDate(),
  check("end_register", "Invalid does not Empty").not().isEmpty(),
  check("end_register", "Invalid format Date").isISO8601().toDate(),
  // check("price", "Invalid does not Empty").not().isEmpty(),
  // check("price", "Numeric only").isNumeric(),
  check("kuota", "Invalid does not Empty").not().isEmpty(),
];
export const addPaymentValidator = [
  check("bank", "Invalid does not Empty").not().isEmpty(),
  check("courseId", "Invalid does not Empty").not().isEmpty(),
  check("atas_nama", "Invalid does not Empty").not().isEmpty(),
  check("no_rek", "Invalid does not Empty").not().isEmpty(),
  check("batchId", "Invalid does not Empty").not().isEmpty(),
];
export const editPaymentValidator = [
  check("bank", "Invalid does not Empty").not().isEmpty().optional(),
  check("atas_nama", "Invalid does not Empty").not().isEmpty().optional(),
  check("no_rek", "Invalid does not Empty").not().isEmpty().optional(),
  check("status", "Invalid does not Empty").not().isEmpty().optional(),
];

export const addBatchCourseValidator = [
  // check("start_schedule", "Invalid does not Empty").not().isEmpty(),
  // check("start_schedule", "Invalid format Date").isISO8601().toDate(),
  // check("end_schedule", "Invalid does not Empty").not().isEmpty(),
  // check("end_schedule", "Invalid format Date").isISO8601().toDate(),
  check("courseId", "Invalid does not Empty").not().isEmpty(),
  check("batchId", "Invalid does not Empty").not().isEmpty(),
];

export const addUserCourseValidator = [
  check("batchId", "Invalid does not Empty").not().isEmpty(),
  check("bank", "Invalid does not Empty").not().isEmpty(),
  check("no_rek", "Invalid does not Empty").not().isEmpty(),
  check("atas_nama", "Invalid does not Empty").not().isEmpty(),
];
export const editUserCourseValidator = [
  check("batchId", "Invalid does not Empty").not().isEmpty(),
];

export const addCourseFolderValidator = [
  check("name", "Invalid does not Empty").not().isEmpty(),
  check("courseId", "Invalid does not Empty").not().isEmpty(),
];
export const editCourseFolderValidator = [
  check("name", "Invalid does not Empty").not().isEmpty(),
  check("courseId", "Invalid does not Empty").not().isEmpty(),
];
export const addCourseTaskValidator = [
  check("title", "Invalid does not Empty").not().isEmpty(),
  check("description", "Invalid does not Empty").not().isEmpty(),
  check("courseFolderId", "Invalid does not Empty").not().isEmpty(),
];
export const addCourseFileValidator = [
  check("courseFolderId", "Invalid does not Empty").not().isEmpty(),
];

export const addProofPaymentValidator = [
  check("paymentId", "Invalid does not Empty").not().isEmpty(),
];

export const addQuestionValidator = [
  check("question", "Invalid does not Empty").not().isEmpty(),
  check("pgId", "Invalid does not Empty").not().isEmpty(),
  // check("points", "Invalid does not Empty").not().isEmpty(),
  // check("points", "Invalid does not Empty").isNumeric(),
];
export const addUserAnswerValidator = [
  check("questionAnswerId", "Invalid does not Empty").not().isEmpty(),
  check("questionId", "Invalid does not Empty").not().isEmpty(),
];
export const addQuestionAnswerValidator = [
  check("answer", "Invalid does not Empty").not().isEmpty(),
  check("isCorrect", "Invalid does not Empty").not().isEmpty(),
  check("isCorrect", "Only Boolean").isBoolean(),
  check("questionId", "Invalid does not Empty").not().isEmpty(),

  // check("points", "Invalid does not Empty").not().isEmpty(),
  // check("points", "Invalid does not Empty").isNumeric(),
];
export const addPGValidator = [
  check("courseFolderId", "Invalid does not Empty").not().isEmpty(),
  check("points", "Invalid does not Empty").not().isEmpty(),
  check("points", "Numeric Only").isNumeric(),
];

export const addSubmissionValidator = [
  check("taskId", "Invalid does not Empty").not().isEmpty(),
];

export const addCourseTaskFileValidator = [
  check("courseTaskId", "Invalid does not Empty").not().isEmpty(),
];

export const addCourseValidator = [
  check("name", "Invalid does not Empty").not().isEmpty(),
  // check("price", "Invalid does not Empty").not().isEmpty(),
  // check("price", "Numeric only").isNumeric(),
  check("category", "Invalid does not Empty").not().isEmpty(),
  check("category", "Invalid does value category").isIn(["KURSUS", "WORKSHOP"]),
  check("methode", "Invalid does not Empty").not().isEmpty(),
  check("methode", "Invalid does value category").isIn(["OFFLINE", "ONLINE"]),
];

export const registerValidator = [
  check("fullname", "Invalid does not Empty").not().isEmpty(),
  check("username", "Invalid does not Empty").not().isEmpty(),
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

export const changePasswordValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = req.user;
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    await check("oldPassword", "Invalid does not Empty")
      .not()
      .isEmpty()
      .run(req);
  }

  await check("password", "Invalid does not Empty").not().isEmpty().run(req);

  await check("password", "Password must be between 4 to 16 characters")
    .isLength({
      min: 4,
      max: 16,
    })
    .run(req);

  await check("confirmPassword")
    .isLength({
      min: 4,
      max: 16,
    })
    .withMessage("Password must be between 4 to 16 characters")
    .custom(async (confirmPassword: any, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    })
    .run(req);

  next();
};

export const updateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = req.user;
  await check("fullname", "Invalid does not Empty").not().isEmpty().run(req);
  await check("username", "Invalid does not Empty").not().isEmpty().run(req);
  await check("phoneNumber", "Invalid does not Empty").not().isEmpty().run(req);
  await check("role", "Invalid does not Empty").not().isEmpty().run(req);

  if (user.role === "SUPERADMIN") {
    await check("role", "Invalid does value role")
      .isIn(["STUDENT", "TEACHER", "ADMIN", "SUPERADMIN"])
      .run(req);
  } else {
    await check("role", "Invalid does value role")
      .isIn(["STUDENT", "TEACHER", "ADMIN"])
      .run(req);
  }

  next();
};

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
