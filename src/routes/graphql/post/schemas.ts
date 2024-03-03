import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const postType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'ID',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'title of post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'content of post',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'author ID',
    },
  }),
});
