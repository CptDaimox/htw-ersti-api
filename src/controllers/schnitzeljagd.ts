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

async function setSchnitzelJagd(password: string, groupSize: number, userId: number) {
  const schnitzelJagd = await prisma.schnitzeljagd.create({
    data: {
      password: password,
      groupSize: groupSize,
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}

export { getAllSchnitzel, getSchnitzelByUserId, setSchnitzelJagd };
