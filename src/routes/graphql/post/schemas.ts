import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
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

export const postInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
});

export const postChangeInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  },
});
