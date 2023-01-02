import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllSchnitzel() {
  const allUsers = await prisma.schnitzeljagd.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getSchnitzelByUserId(userId: number) {
  const user = await prisma.schnitzeljagd.findMany({
    where: {
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return user;
}

export { getAllSchnitzel, getSchnitzelByUserId };
