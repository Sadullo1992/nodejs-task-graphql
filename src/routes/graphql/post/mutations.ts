import { GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { postType, postInputType, } from './schemas.js';

export const postMutation = {
  createPost: {
    type: postType,
    args: {
      dto: {
        type: new GraphQLNonNull(postInputType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.post.create({
        data: args.dto,
      }),
  },
};
