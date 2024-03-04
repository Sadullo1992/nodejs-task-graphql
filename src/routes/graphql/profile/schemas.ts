import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { memberType, memberTypeId } from '../member/schemas.js';
import { IContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'ID',
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'gender',
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'content of post',
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'user ID',
    },
    memberTypeId: {
      type: memberTypeId,
      description: 'member type ID',
    },
    memberType: {
      type: memberType,
      resolve: async (args, _, { prisma }: IContext) =>
        await prisma.memberType.findUnique({
          where: { id: args.memberTypeId },
        }),
    },
  }),
});

export const profileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: memberTypeId,
    },
  },
});
