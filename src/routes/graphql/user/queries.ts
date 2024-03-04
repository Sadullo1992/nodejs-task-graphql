import { GraphQLList, GraphQLNonNull } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';
import { userType } from './schemas.js';

export const userQueries = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_, _args, { prisma, loader }: IContext, resolveInfo) => {
      const parsedResolveInfoFragment = parseResolveInfo(resolveInfo) as ResolveTree;
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment,
        resolveInfo.returnType,
      );

      const hasUserSubscribedTo = fields.hasOwnProperty('userSubscribedTo');
      const hasSubscribedToUser = fields.hasOwnProperty('subscribedToUser');

      const users = await prisma.user.findMany({
        include: {
          userSubscribedTo: hasUserSubscribedTo,
          subscribedToUser: hasSubscribedToUser,
        },
      });

      if (hasUserSubscribedTo || hasSubscribedToUser) {
        users.forEach((user, _, arr) => {
          if (hasUserSubscribedTo) {
            const subscribers = user.userSubscribedTo.map(({ authorId }) =>
              arr.find((item) => item.id === authorId),
            );
            loader.userSubscribedToLoader.prime(user.id, subscribers);
          }
          if (hasSubscribedToUser) {
            const subscribers = user.subscribedToUser.map(({ subscriberId }) =>
              arr.find((item) => item.id === subscriberId),
            );
            loader.subscribedToUserLoader.prime(user.id, subscribers);
          }
        });
      }

      return users;
    },
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
