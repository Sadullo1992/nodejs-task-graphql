import { GraphQLList } from 'graphql';
import { IContext } from '../types/types.js';
import { postType } from './schemas.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(postType),
    resolve: (_, _args, { prisma }: IContext) => prisma.post.findMany(),
  },
};
