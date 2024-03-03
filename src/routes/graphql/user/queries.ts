import { GraphQLList } from 'graphql';
import { IContext } from '../types/types.js';
import { userType } from './schemas.js';

export const userQueries = {
  users: {
    type: new GraphQLList(userType),
    resolve: (_, _args, { prisma }: IContext) => prisma.user.findMany(),
  },
};
