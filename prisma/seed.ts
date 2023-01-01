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
      roleName: 'student',
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

  console.log(toan, florian);
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

  const schnitzelFlo = await prisma.schnitzeljagd.upsert({
    where: { password: 'Sommersemester2022' },
    update: {},
    create: {
      password: 'Sommersemester2022',
      groupSize: 5,
      userId: 563182,
    },
  });

  console.log(schnitzelToan, schnitzelFlo);
}

async function createGames() {
  
  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: '4 Gewinnt',
      rules: 'Schnitzeljagd',
    },
  });
  const game2 = await prisma.game.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Twister',
      rules: 'Schnitzeljagd',
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
      userId: 563182,
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
      schnitzeljagdId: 2,
    },
  });

  console.log(station1, station2);
}

async function createRoles(){
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