import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllStations() {
  const allUsers = await prisma.station.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getStationSchnitzelId(schnitzelJagdId: string) {
  const user = await prisma.station.findMany({
    where: {
      schnitzelJagdId: { equals: schnitzelJagdId },
    },
  });
  await prisma.$disconnect();
  return user;
}

async function setStation(
  location: string,
  qrCode: string,
  clue: string,
  endText: string,
  schnitzelJagdId: string,
) {
  const game = await prisma.station.create({
    data: {
      location: location,
      qrCode: qrCode,
      clue: clue,
      endText: endText,
      schnitzelJagdId: schnitzelJagdId,
    },
  });
  await prisma.$disconnect();
  return game;
}

async function updateStation(
  id: string,
  location: string,
  qrCode: string,
  clue: string,
  endText: string,
  schnitzelJagdId: string,
) {
  const updateStation = await prisma.station
    .update({
      where: {
        id: id,
      },
      data: {
        location: location,
        qrCode: qrCode,
        clue: clue,
        endText: endText,
        schnitzelJagdId: schnitzelJagdId,
      },
    })
    .catch((e) => {
      return e;
    });
  await prisma.$disconnect();
  return updateStation;
}

async function deleteStation(ids: string[]) {
  const deleteStation = await prisma.station.deleteMany({ where: { id: { in: ids } } }).catch((e) => {
    return e;
  });
  await prisma.$disconnect();
  return deleteStation;
}
export { getAllStations, getStationSchnitzelId, setStation, updateStation, deleteStation };
