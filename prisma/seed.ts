import prisma from "../config/prisma";
async function main() {
  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      fullname: "Testing",
      image: "Test",
      password: "test",
      username: "test",
    },
  });

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers);
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
