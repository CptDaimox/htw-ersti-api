import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const toan = await prisma.user.upsert({
    where: { email: 'toan@htw-berlin.de' },
    update: {},
    create: {
      id: 564071,
      email: 'toan@htw-berlin.de',
      name: 'Toan Tran Quoc',
      role: 'student',
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
      role: 'student',
      password: '1234',
    },
  });

  console.log(toan, florian);
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
