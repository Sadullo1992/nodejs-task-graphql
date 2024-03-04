import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { postType, postInputType } from './schemas.js';

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
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) => {
      await prisma.post.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
