import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  await prisma.$disconnect();
  return user;
}

async function checkUser(user: User | null, password: string) {
  return (user && user.password === password) ?? false;
}

export { getUserByEmail, checkUser };
