import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { profileType, profileInputType, profileChangeInputType } from './schemas.js';

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
  changeProfile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(profileChangeInputType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      }),
  },
};
