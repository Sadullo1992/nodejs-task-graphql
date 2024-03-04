import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberQueries } from './member/queries.js';
import { postMutation } from './post/mutations.js';
import { postQueries } from './post/queries.js';
import { profileMutation } from './profile/mutations.js';
import { profileQueries } from './profile/queries.js';
import { userMutation } from './user/mutations.js';
import { userQueries } from './user/queries.js';

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

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...memberQueries,
    ...postQueries,
    ...userQueries,
    ...profileQueries,
  }),
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userMutation,
    ...postMutation,
    ...profileMutation,
  }),
});

export const graphQLSchema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
