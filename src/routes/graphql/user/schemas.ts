import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { postType } from '../post/schemas.js';
import { profileType } from '../profile/schemas.js';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const userType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'ID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'name of user',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'balance of user',
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (args, _, { prisma }: IContext) =>
        await prisma.post.findMany({
          where: { authorId: args.id },
        }),
    },
    profile: {
      type: profileType,
      resolve: async (args, _, { prisma }: IContext) =>
        await prisma.profile.findUnique({
          where: { userId: args.id },
        }),
    },
  }),
});
