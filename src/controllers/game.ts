import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllGames() {
  const allUsers = await prisma.game.findMany({
    where: {
      userId: null,
    }
  });
  await prisma.$disconnect();
  return allUsers;
}

async function getGameByUserId(userId: number) {
  const user = await prisma.game.findMany({
    where: {
      OR: [
        {
          userId: { equals: userId },
        },
        {
          userId: { equals: null },
        },
      ],
    },
  });
  await prisma.$disconnect();
  return user;
}

export { getAllGames, getGameByUserId };
