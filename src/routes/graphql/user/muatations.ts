import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { IContext, Void } from '../types/types.js';
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
    type: Void,
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
        type: UUIDType,
      },
      dto: {
        type: userChangeInputType,
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
  subscribeTo: {
    type: Void,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) => {
      await prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      });
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, args, { prisma }: IContext) => {
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });
    },
  },
};
