import { GraphQLList, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { userType } from './schemas.js';

export const userQueries = {
  users: {
    type: new GraphQLList(userType),
    resolve: (_, _args, { prisma }: IContext) => prisma.user.findMany(),
  },
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.user.findUnique({
        where: { id: args.id },
      }),
  },
};
