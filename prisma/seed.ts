import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await createRoles();
  await createUsers();
  await createSchnitzelJagd();
  await createGames();
  await createStations();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createUsers() {
  const toan = await prisma.user.upsert({
    where: { email: 'toan@htw-berlin.de' },
    update: {},
    create: {
      id: 564071,
      email: 'toan@htw-berlin.de',
      name: 'Toan Tran Quoc',
      roleName: 'buddy',
      password: '1234',
    },
  });

  const florian = await prisma.user.upsert({
    where: { email: 'florian@htw-berlin.de' },
    update: {},
    create: {
      id: 563182,
      email: 'florian@htw-berlin.de',
      name: 'Florian Stüber',
      roleName: 'student',
      password: '1234',
    },
  });

  const friedrich = await prisma.user.upsert({
    where: { email: 'friedrich@htw-berlin.de' },
    update: {},
    create: {
      id: 580113,
      email: 'friedrich@htw-berlin.de',
      name: 'Friedrich Luckmann',
      roleName: 'student',
      password: '1234',
    },
  });

  const jacob = await prisma.user.upsert({
    where: { email: 'jacob@htw-berlin.de' },
    update: {},
    create: {
      id: 563974,
      email: 'jacob@htw-berlin.de',
      name: 'Jacob-Benedikt Haut',
      roleName: 'student',
      password: '1234',
    },
  });

  const enis = await prisma.user.upsert({
    where: { email: 'enis@htw-berlin.de' },
    update: {},
    create: {
      id: 579664,
      email: 'enis@htw-berlin.de',
      name: 'Enis Aztekin',
      roleName: 'student',
      password: '1234',
    },
  });

  const levent = await prisma.user.upsert({
    where: { email: 'levent@htw-berlin.de' },
    update: {},
    create: {
      id: 571734,
      email: 'levent@htw-berlin.de',
      name: 'Kevin Levent Julian Arica',
      roleName: 'student',
      password: '1234',
    },
  });

  const mama = await prisma.user.upsert({
    where: { email: 'mama@htw-berlin.de' },
    update: {},
    create: {
      id: 654321,
      email: 'mama@htw-berlin.de',
      name: 'Mama Luckmann',
      roleName: 'student',
      password: '1234',
    },
  });

  const papa = await prisma.user.upsert({
    where: { email: 'papa@htw-berlin.de' },
    update: {},
    create: {
      id: 123456,
      email: 'papa@htw-berlin.de',
      name: 'Papa Luckmann',
      roleName: 'student',
      password: '1234',
    },
  });
  console.log(toan, florian, friedrich, jacob, enis, mama, papa, levent);
}

async function createSchnitzelJagd() {
  const schnitzelToan = await prisma.schnitzeljagd.upsert({
    where: { password: 'Sommersemester2023' },
    update: {},
    create: {
      password: 'Sommersemester2023',
      groupSize: 5,
      userId: 564071,
    },
  });

  console.log(schnitzelToan);
}

async function createGames() {
  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: '4 Gewinnt',
      rules: 'Schnitzeljagd',
      userId: 564071,
    },
  });
  const game2 = await prisma.game.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Twister',
      rules: 'Schnitzeljagd',
      userId: 564071,
    },
  });

  const game3 = await prisma.game.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Elf Meter schießen',
      rules: 'Schnitzeljagd',
      userId: 564071,
    },
  });

  const game4 = await prisma.game.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Sackhüpfen',
      rules: 'Schnitzeljagd',
      userId: 564071,
    },
  });
  const game5 = await prisma.game.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Pinata',
      rules: 'Schnitzeljagd',
      userId: 564071,
    },
  });

  console.log(game1, game2, game3, game4, game5);
}

async function createStations() {
  const station1 = await prisma.station.upsert({
    where: { id: 1 },
    update: {},
    create: {
      location: 'Mensa',
      gameId: 1,
      qrCode: '1234',
      clue: 'Hier ist die Mensa',
      endText: 'Ende',
      schnitzeljagdId: 1,
    },
  });

  const station2 = await prisma.station.upsert({
    where: { id: 2 },
    update: {},
    create: {
      location: 'TresLounge',
      gameId: 2,
      qrCode: '1234',
      clue: 'Hier ist die TresLounge',
      endText: 'Ende',
      schnitzeljagdId: 1,
    },
  });

  console.log(station1, station2);
}

async function createRoles() {
  const role1 = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'student',
    },
  });

  const role2 = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'buddy',
    },
  });

  console.log(role1, role2);
}
