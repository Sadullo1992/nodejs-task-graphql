import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberQueries } from './member/queries.js';
import { postQueries } from './post/queries.js';
import { profileQueries } from './profile/queries.js';
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
  fields: {
    ...memberQueries,
    ...postQueries,
    ...userQueries,
    ...profileQueries,
  },
});

export const graphQLSchema = new GraphQLSchema({
  query: rootQuery,
});
