import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllGames() {
  const allUsers = await prisma.game.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getGameByUserId(userId: number) {
  const user = await prisma.game.findMany({
    where: {
      userId: { equals: userId },
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

async function updateGame(id: number, name: string, rules: string) {
  const game = await prisma.game.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      rules: rules,
    },
  });
  await prisma.$disconnect();
  return game;
}

async function deleteGames(ids: number[]) {
  const game = await prisma.game.deleteMany({ where: { id: { in: ids } } }).catch((e) => {
    return e;
  });
  await prisma.$disconnect();
  return game;
}

export { getAllGames, getGameByUserId, setGame, updateGame, deleteGames };
