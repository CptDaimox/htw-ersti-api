import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllGroups() {
  const allUsers = await prisma.schnitzelGroup.findMany();
  await prisma.$disconnect();
  return allUsers;
}

async function getGroupByLeaderId(userId: number) {
  const user = await prisma.schnitzelGroup.findMany({
    where: {
      groupLeaderId: userId,
    },
  });
  await prisma.$disconnect();
  return user[0];
}

async function getGroupById(id: number) {
  const schnitzel = await prisma.schnitzelGroup.findUnique({
    where: {
      id: id,
    },
    include: {
      groupMembers: { select: { id: true, email: true, name: true } },
      groupLeader: { select: { id: true, email: true, name: true } },
    },
  });
  await prisma.$disconnect();
  return schnitzel;
}

async function getGroupMembers(id: number) {
  const user = await prisma.schnitzelGroup.findUnique({
    where: {
      id: id,
    },
    select: { groupMembers: true },
  });
  await prisma.$disconnect();
  return user;
}

async function setSchnitzelGroup(groupLeaderId: number, groupName: string, schnitzeljagdPw: string) {
  const schnitzelJagd = await prisma.schnitzelGroup.create({
    data: {
      groupLeaderId: groupLeaderId,
      groupName: groupName,
      schnitzeljagdPw: schnitzeljagdPw,
    },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function updateGroup(id: number, groupName: string) {
  const schnitzelJagd = await prisma.schnitzelGroup
    .update({
      where: {
        id: id,
      },
      data: {
        groupName: groupName,
      },
    })
    .catch((e) => {
      return e;
    });
  await prisma.$disconnect();
  return schnitzelJagd;
}

async function getByPassword(password: string) {
  const schnitzelJagd = await prisma.schnitzelGroup.findMany({
    where: {
      schnitzeljagdPw: password,
    },
  });
  await prisma.$disconnect();
  return schnitzelJagd;
}
export {
  getAllGroups,
  getByPassword,
  getGroupByLeaderId,
  getGroupById,
  getGroupMembers,
  setSchnitzelGroup,
  updateGroup,
};
