import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

export const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const memberType = new GraphQLObjectType({
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
