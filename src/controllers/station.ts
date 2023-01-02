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

export { getAllStations, getStationSchnitzelId };
