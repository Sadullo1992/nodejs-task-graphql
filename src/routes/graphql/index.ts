import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQLSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { handleDataLoader } from './loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const validateErrors = validate(graphQLSchema, parse(query));

      if (validateErrors.length > 0) return { errors: validateErrors };

      return await graphql({
        schema: graphQLSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, loader: handleDataLoader(prisma) },
      });
    },
  });
};

export default plugin;
