import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchUserSubscribedTo = async (prisma: PrismaClient, keys) => {
  const users = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: {
            in: keys,
          },
        },
      },
    },
    include: {
      subscribedToUser: true,
    },
  });

  return keys.map((key) =>
    users.filter((user) =>
      user.subscribedToUser.some((item) => item.subscriberId === key),
    ),
  );
};

export const createUserSubscribedToLoader = (prisma) => {
  return new DataLoader((keys) => batchUserSubscribedTo(prisma, keys));
};

const batchSubscribedToUser = async (prisma: PrismaClient, keys) => {
  const users = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: {
            in: keys,
          },
        },
      },
    },
    include: {
      userSubscribedTo: true,
    },
  });

  return keys.map((key) =>
    users.filter((user) => user.userSubscribedTo.some((item) => item.authorId === key)),
  );
};

export const createSubscribedToUserLoader = (prisma) => {
  return new DataLoader((keys) => batchSubscribedToUser(prisma, keys));
};
