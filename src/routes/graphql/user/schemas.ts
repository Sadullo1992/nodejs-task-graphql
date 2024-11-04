import {
  GraphQLFloat,
  GraphQLInputObjectType,
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
      resolve: async (args, _, { loader }: IContext) =>
        await loader.postLoader.load(args.id),
    },
    profile: {
      type: profileType,
      resolve: async (args, _, { loader }: IContext) =>
        await loader.profileLoader.load(args.id),
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (args, _, { loader }: IContext) =>
        await loader.userSubscribedToLoader.load(args.id),
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (args, _, { loader }: IContext) =>
        await loader.subscribedToUserLoader.load(args.id),
    },
  }),
});

export const userInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

export const userChangeInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
