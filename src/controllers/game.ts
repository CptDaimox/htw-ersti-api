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

async function setGame(name: string, rules: string, userId: number) {
  const game = await prisma.game.create({
    data: {
      name: name,
      rules: rules,
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return game;
}

export { getAllGames, getGameByUserId, setGame };
