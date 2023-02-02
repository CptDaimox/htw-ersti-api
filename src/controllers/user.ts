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

async function joinSchnitzelJagd(password: string, userId: number) {
  const schnitzelJagd = await prisma.user
    .update({
      where: {
        id: userId,
      },
      data: {
        joinedSchnitzel: {
          connect: {
            password: password,
          },
        },
      },
      include: {
        joinedSchnitzel: { include: { joinedUsers: true, Station: true } },
      },
    })
    .catch((e) => {
      return e;
    });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function joinGroup(groupId: number, userId: number) {
  const group = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      schnitzelGroup: { connect: { id: groupId } },
    },
    include: { schnitzelGroup: true },
  });

  await prisma.$disconnect();
  return group;
}

export { getUserByEmail, checkUser, joinSchnitzelJagd, joinGroup };
