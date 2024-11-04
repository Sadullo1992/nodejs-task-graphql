import { GraphQLScalarType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { handleDataLoader } from '../loader.js';

export interface IContext {
  prisma: PrismaClient;
  loader: ReturnType<typeof handleDataLoader>;
}

export const Void = new GraphQLScalarType({
  name: 'Void',

  description: 'Represents NULL values',

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});
