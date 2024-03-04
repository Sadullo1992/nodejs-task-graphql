import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { profileType, profileInputType } from './schemas.js';

export const profileMutation = {
  createProfile: {
    type: profileType,
    args: {
      dto: {
        type: new GraphQLNonNull(profileInputType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.profile.create({
        data: args.dto,
      }),
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) => {
      await prisma.profile.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
