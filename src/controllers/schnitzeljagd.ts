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
  return user[0];
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

async function updateSchnitzelJagd(id: number, password: string, groupSize: number) {
  const schnitzelJagd = await prisma.schnitzeljagd
    .update({
      where: {
        id: id,
      },
      data: {
        password: password,
        groupSize: groupSize,
      },
    })
    .catch((e) => {
      return e;
    });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function getByPassword(password: string) {
  const schnitzelJagd = await prisma.schnitzeljagd.findUnique({
    where: {
      password: password,
    },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}
export { getAllSchnitzel, getSchnitzelByUserId, setSchnitzelJagd, updateSchnitzelJagd, getByPassword };
