import prisma from "../config/prisma";
import { hashPassword } from "../utils/bcrypt";
async function main() {
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
  // await prisma.batchCourse.deleteMany();
  await prisma.batch.deleteMany();
  // await prisma.courseFile.deleteMany();
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
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
