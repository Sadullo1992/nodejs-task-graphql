import { Type } from '@fastify/type-provider-typebox';
import { PrismaClient } from '@prisma/client';
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'basic' },
    BUSINESS: { value: 'business' },
  },
});

const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: memberTypeId,
      description: 'ID',
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'discount',
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'postsLimitPerMonth',
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: (_, _args, { prisma }: { prisma: PrismaClient }) =>
        prisma.memberType.findMany(),
    },
  },
});

export const graphQLSchema = new GraphQLSchema({
  query: rootQuery,
});
