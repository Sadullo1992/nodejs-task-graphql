import { GraphQLList, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { postType } from './schemas.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(postType),
    resolve: (_, _args, { prisma }: IContext) => prisma.post.findMany(),
  },
  post: {
    type: postType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.post.findUnique({
        where: { id: args.id },
      }),
  },
};
