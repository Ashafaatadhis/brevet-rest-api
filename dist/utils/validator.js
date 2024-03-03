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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.updateValidator = exports.registerValidator = exports.addCourseValidator = exports.addCourseFileValidator = exports.addCourseFolderValidator = exports.addBatchValidator = void 0;
const express_validator_1 = require("express-validator");
exports.addBatchValidator = [
    (0, express_validator_1.check)("name", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("start_register", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("start_register", "Invalid format Date").isISO8601().toDate(),
    (0, express_validator_1.check)("end_register", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("end_register", "Invalid format Date").isISO8601().toDate(),
    (0, express_validator_1.check)("kuota", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("courseId", "Invalid does not Empty").not().isEmpty(),
];
exports.addCourseFolderValidator = [
    (0, express_validator_1.check)("name", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("courseId", "Invalid does not Empty").not().isEmpty(),
];
exports.addCourseFileValidator = [
    (0, express_validator_1.check)("courseFolderId", "Invalid does not Empty").not().isEmpty(),
];
exports.addCourseValidator = [
    (0, express_validator_1.check)("name", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("category", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("category", "Invalid does value category").isIn(["KURSUS", "WORKSHOP"]),
    (0, express_validator_1.check)("methode", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("methode", "Invalid does value category").isIn(["OFFLINE", "ONLINE"]),
    (0, express_validator_1.check)("price", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("price", "Numeric only").isNumeric(),
];
exports.registerValidator = [
    (0, express_validator_1.check)("fullname", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("username", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("email", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("email", "Invalid email").isEmail(),
    (0, express_validator_1.check)("password", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password must be between 4 to 16 characters").isLength({
        min: 4,
        max: 16,
    }),
    (0, express_validator_1.check)("confirmPassword")
        .isLength({
        min: 4,
        max: 16,
    })
        .withMessage("Password must be between 4 to 16 characters")
        .custom((confirmPassword, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const password = req.body.password;
        if (password !== confirmPassword) {
            throw new Error("Passwords must be same");
        }
    })),
];
exports.updateValidator = [
    (0, express_validator_1.check)("fullname", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("username", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("phoneNumber", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("role", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("role", "Invalid does value role").isIn([
        "STUDENT",
        "TEACHER",
        "ADMIN",
    ]),
];
exports.loginValidator = [
    (0, express_validator_1.check)("username", "Invalid does not Empty").not().isEmpty(),
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
    (0, express_validator_1.check)("password", "Invalid does not Empty").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password must be between 4 to 16 characters").isLength({
        min: 4,
        max: 16,
    }),
];
