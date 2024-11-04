import { GraphQLList, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { memberType, memberTypeId } from './schemas.js';

export const memberQueries = {
  memberTypes: {
    type: new GraphQLList(memberType),
    resolve: (_, _args, { prisma }: IContext) => prisma.memberType.findMany(),
  },
  memberType: {
    type: memberType,
    args: {
      id: {
        type: new GraphQLNonNull(memberTypeId),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.memberType.findUnique({
        where: { id: args.id },
      }),
  },
};
