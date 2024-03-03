import { GraphQLList } from 'graphql';
import { IContext } from '../types/types.js';
import { profileType } from './schemas.js';

export const profileQueries = {
  profiles: {
    type: new GraphQLList(profileType),
    resolve: (_, _args, { prisma }: IContext) => prisma.profile.findMany(),
  },
};
