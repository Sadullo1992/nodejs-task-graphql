import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchMemberFn = async (prisma: PrismaClient, keys) => {
  const users = await prisma.memberType.findMany({
    where: {
      id: {
        in: keys,
      },
    },
  });

  return keys.map((key) => users.find((item) => item.id === key));
};

export const createMemberTypeLoader = (prisma) => {
  return new DataLoader((keys) => batchMemberFn(prisma, keys));
};
