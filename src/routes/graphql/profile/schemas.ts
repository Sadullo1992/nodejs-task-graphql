import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { memberTypeId } from '../member/schemas.js';
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
  }),
});
