import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchProfileFn = async (prisma: PrismaClient, keys) => {
  const profiles = await prisma.profile.findMany({
    where: {
      userId: {
        in: keys,
      },
    },
  });

  return keys.map((key) => profiles.find((item) => item.userId === key));
};

export const createProfileLoader = (prisma) => {
  return new DataLoader((keys) => batchProfileFn(prisma, keys));
};
