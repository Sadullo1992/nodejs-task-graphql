import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchPostFn = async (prisma: PrismaClient, keys) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: keys,
      },
    },
  });

  return keys.map((key) => posts.filter((post) => post.authorId === key));
};

export const createPostLoader = (prisma) => {
  return new DataLoader((keys) => batchPostFn(prisma, keys));
};
