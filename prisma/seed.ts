import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await createRoles();
  await createUsers();
  await createSchnitzelJagd();
  // await createGames();
  // await createStations();
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

async function createRoles() {
  const student = await prisma.role.upsert({
    where: { name: 'student' },
    update: {},
    create: {
      name: 'student',
    },
  });

  const buddy = await prisma.role.upsert({
    where: { name: 'buddy' },
    update: {},
    create: {
      name: 'buddy',
    },
  });

  console.log(buddy, student);
}

async function createUsers() {
  const florian = await prisma.user.upsert({
    where: { email: 'florian@htw-berlin.de' },
    update: {},
    create: {
      matNr: 563182,
      email: 'florian@htw-berlin.de',
      name: 'Florian Stüber',
      roleName: 'buddy',
      password: '1234',
    },
  });

  const toan = await prisma.user.upsert({
    where: { email: 'toan@htw-berlin.de' },
    update: {},
    create: {
      matNr: 564071,
      email: 'toan@htw-berlin.de',
      name: 'Toan',
      roleName: 'buddy',
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
      ownerId: 564071,
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
    },
  });

  const schnitzelFlo = await prisma.schnitzeljagd.upsert({
    where: { password: 'Sommersemester2023' },
    update: {},
    create: {
      password: 'Sommersemester2022',
      groupSize: 5,
      ownerId: 563182,
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
    },
  });

  console.log(schnitzelToan, schnitzelFlo);
}

// async function createGames() {

//   const game1 = await prisma.game.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       name: '4 Gewinnt',
//       rules: 'Schnitzeljagd',
//       userId: 564071,
//     },
//   });
//   const game2 = await prisma.game.upsert({
//     where: { id: 2 },
//     update: {},
//     create: {
//       name: 'Twister',
//       rules: 'Schnitzeljagd',
//       userId: 563182,
//     },
//   });

//   const game3 = await prisma.game.upsert({
//     where: { id: 3 },
//     update: {},
//     create: {
//       name: 'Elf Meter schießen',
//       rules: 'Schnitzeljagd',
//       userId: 564071,
//     },
//   });

//   const game4 = await prisma.game.upsert({
//     where: { id: 4 },
//     update: {},
//     create: {
//       name: 'Sackhüpfen',
//       rules: 'Schnitzeljagd',
//       userId: 563182,
//     },
//   });
//   const game5 = await prisma.game.upsert({
//     where: { id: 5 },
//     update: {},
//     create: {
//       name: 'Pinata',
//       rules: 'Schnitzeljagd',
//       userId: 564071,
//     },
//   });

//   console.log(game1, game2, game3, game4, game5);
// }

// async function createStations() {
//   const station1 = await prisma.station.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       location: 'Mensa',
//       gameId: 1,
//       qrCode: '1234',
//       clue: 'Hier ist die Mensa',
//       endText: 'Ende',
//       schnitzeljagdId: 1,
//     },
//   });

//   const station2 = await prisma.station.upsert({
//     where: { id: 2 },
//     update: {},
//     create: {
//       location: 'TresLounge',
//       gameId: 2,
//       qrCode: '1234',
//       clue: 'Hier ist die TresLounge',
//       endText: 'Ende',
//       schnitzeljagdId: 2,
//     },
//   });

//   console.log(station1, station2);
// }
