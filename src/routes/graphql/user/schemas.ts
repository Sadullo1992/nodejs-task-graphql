import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const userType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'ID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'name of user',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'balance of user',
    },
  }),
});
