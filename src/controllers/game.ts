import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllGames() {
  const allUsers = await prisma.game.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getGameById(id: string) {
  const user = await prisma.game.findMany({
    where: {
      id: { equals: id },
    },
  });
  await prisma.$disconnect();
  return user;
}

async function setGame(name: string, rules: string) {
  const game = await prisma.game.create({
    data: {
      name: name,
      rules: rules,
    },
  });
  await prisma.$disconnect();
  return game;
}

async function updateGame(id: string, name: string, rules: string) {
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

async function deleteGames(ids: string[]) {
  const game = await prisma.game.deleteMany({ where: { id: { in: ids } } }).catch((e) => {
    return e;
  });
  await prisma.$disconnect();
  return game;
}

export { getAllGames, getGameById, setGame, updateGame, deleteGames };
