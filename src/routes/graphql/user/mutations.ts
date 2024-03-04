import { GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { userInputType, userType } from './schemas.js';

export const userMutation = {
  createUser: {
    type: userType,
    args: {
      dto: {
        type: new GraphQLNonNull(userInputType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.user.create({
        data: args.dto,
      }),
  },
};
