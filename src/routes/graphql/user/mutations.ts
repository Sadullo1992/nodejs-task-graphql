import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { userChangeInputType, userInputType, userType } from './schemas.js';

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
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) => {
      await prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
  changeUser: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(userChangeInputType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) =>
      await prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      }),
  },
};