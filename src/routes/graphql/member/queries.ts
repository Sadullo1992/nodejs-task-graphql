import { GraphQLList } from 'graphql';
import { IContext } from '../types/types.js';
import { memberType } from './schemas.js';

export const memberQueries = {
  memberTypes: {
    type: new GraphQLList(memberType),
    resolve: (_, _args, { prisma }: IContext) => prisma.memberType.findMany(),
  },
};
