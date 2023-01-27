import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllSchnitzel() {
  const allUsers = await prisma.schnitzeljagd.findMany({
    include: {
      station: { include: { game: true } },
    },
  });
  await prisma.$disconnect();
  return allUsers;
}

async function getSchnitzelByUserId(userId: number) {
  const user = await prisma.schnitzeljagd.findMany({
    where: {
      ownerId: userId,
    },
  });
  await prisma.$disconnect();
  return user[0];
}

async function setSchnitzelJagd(schnitzel: Prisma.SchnitzeljagdUncheckedCreateInput) {
  const schnitzelJagd = await prisma.schnitzeljagd.create({
    data: schnitzel,
    include: { station: { include: { game: true } } },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function updateSchnitzelJagd(data: Prisma.SchnitzeljagdUncheckedUpdateInput, id: string) {
  const schnitzelJagd = await prisma.schnitzeljagd
    .update({
      where: {
        id: id,
      },
      data: data,
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
    include: {
      station: { include: { game: true } },
    },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function setSchnitzelJagdTemplate(matNr: number) {
  const schnitzel = {
    password: `${matNr}`,
    groupSize: 5,
    ownerId: matNr,
    station: {
      create: [
        {
          location: 'Mensa',
          qrCode: '1234',
          clue: 'Hier ist die Mensa',
          endText: 'Ende',
          game: {
            create: {
              name: '4 Gewinnt',
              rules: 'Schnitzeljagd',
            },
          },
        },
        {
          location: 'TresLounge',
          qrCode: '1234',
          clue: 'TresLounge',
          endText: 'Ende',
          game: {
            create: {
              name: 'Twister',
              rules: 'Schnitzeljagd',
            },
          },
        },
      ],
    },
  };
  return await setSchnitzelJagd(schnitzel);
}

export {
  getAllSchnitzel,
  getSchnitzelByUserId,
  setSchnitzelJagd,
  updateSchnitzelJagd,
  getByPassword,
  setSchnitzelJagdTemplate,
};
