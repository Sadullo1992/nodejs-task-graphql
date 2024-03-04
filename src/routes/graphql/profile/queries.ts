import { GraphQLList, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { profileType } from './schemas.js';

export const profileQueries = {
  profiles: {
    type: new GraphQLList(profileType),
    resolve: (_, _args, { prisma }: IContext) => prisma.profile.findMany(),
  },
  profile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.profile.findUnique({
        where: { id: args.id },
      }),
  },
};
