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
const prisma_1 = __importDefault(require("../config/prisma"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        // await prisma.user.deleteMany();
        // await prisma.payment.deleteMany();
        // await prisma.userCourses.deleteMany();
        yield prisma_1.default.batch.deleteMany();
=======
        // await prisma.batchCourse.deleteMany();
        // await prisma.submissionFile.deleteMany();
        // await prisma.courseTaskFile.deleteMany();
        // await prisma.courseTask.deleteMany();
        // await prisma.userAnswer.deleteMany();
        // await prisma.questionAnswer.deleteMany();
        // await prisma.question.deleteMany();
        // await prisma.pG.deleteMany();
        // await prisma.courseFile.deleteMany();
        // await prisma.courseFolder.deleteMany();
        // await prisma.course.deleteMany();
        yield prisma_1.default.batchCourse.deleteMany();
        // await prisma.courseFile.deleteMany();
>>>>>>> 02861ccee35cfb04eee816b7b616a73608c4be87
        // for (let i = 1; i <= 30; i++) {
        //   await prisma.user.create({
        //     data: {
        //       email: `student${i}@gmail.com`,
        //       fullname: `student${i}`,
        //       password: (await hashPassword(`student${i}@123`)) as string,
        //       username: `student${i}`,
        //       role: "STUDENT",
        //     },
        //   });
        // }
        // await prisma.user.create({
        //   data: {
        //     email: "teacher@gmail.com",
        //     fullname: "teacher",
        //     password: (await hashPassword("teacher@123")) as string,
        //     username: "teacher",
        //     role: "TEACHER",
        //   },
        // });
        // await prisma.user.create({
        //   data: {
        //     email: "student@gmail.com",
        //     fullname: "student",
        //     password: (await hashPassword("student@123")) as string,
        //     username: "student",
        //     role: "STUDENT",
        //   },
        // });
        // await prisma.user.create({
        //   data: {
        //     email: "admin@gmail.com",
        //     fullname: "admin",
        //     password: (await hashPassword("admin@123")) as string,
        //     username: "admin",
        //     role: "ADMIN",
        //   },
        // });
        // await prisma.user.create({
        //   data: {
        //     email: "superadmin@gmail.com",
        //     fullname: "superadmin",
        //     password: (await hashPassword("superadmin@123")) as string,
        //     username: "superadmin",
        //     role: "SUPERADMIN",
        //   },
        // });
        // const allUsers = await prisma.user.findMany();
        // console.dir(allUsers);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma_1.default.$disconnect();
    process.exit(1);
}));
