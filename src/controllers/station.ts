import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllStations() {
  const allUsers = await prisma.station.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getStationSchnitzelId(schnitzeljagdId: number) {
  const user = await prisma.station.findMany({
    where: {
      schnitzeljagdId: schnitzeljagdId,
    },
  });
  await prisma.$disconnect();
  return user;
}

async function setStation(
  location: string,
  gameId: number,
  qrCode: string,
  clue: string,
  endText: string,
  schnitzeljagdId: number,
) {
  const game = await prisma.station.create({
    data: {
      location: location,
      gameId: gameId,
      qrCode: qrCode,
      clue: clue,
      endText: endText,
      schnitzeljagdId: schnitzeljagdId,
    },
  });
  await prisma.$disconnect();
  return game;
}
export { getAllStations, getStationSchnitzelId, setStation };
