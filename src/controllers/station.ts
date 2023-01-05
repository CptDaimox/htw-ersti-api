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
      schnitzeljagdId: { equals: schnitzeljagdId },
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

async function updateStation(
  id: number,
  location: string,
  gameId: number,
  qrCode: string,
  clue: string,
  endText: string,
  schnitzeljagdId: number,
) {
  const updateStation = await prisma.station
    .update({
      where: {
        id: id,
      },
      data: {
        location: location,
        gameId: gameId,
        qrCode: qrCode,
        clue: clue,
        endText: endText,
        schnitzeljagdId: schnitzeljagdId,
      },
    })
    .catch((e) => {
      return e;
    });
  await prisma.$disconnect();
  return updateStation;
}

async function deleteStation(ids: number[]) {
  const deleteStation = await prisma.station.deleteMany({ where: { id: { in: ids } } }).catch((e) => {
    return e;
  });
  await prisma.$disconnect();
  return deleteStation;
}
export { getAllStations, getStationSchnitzelId, setStation, updateStation, deleteStation };
