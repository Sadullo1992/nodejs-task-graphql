import { createMemberTypeLoader } from './member/loader.js';

export const handleDataLoader = (prisma) => ({
  //   profileLoader: createProfileLoader(prisma),
  //   postLoader: createPostLoader(prisma),
  memberTypeLoader: createMemberTypeLoader(prisma),
  //   userSubscribedToLoader: createUserSubscribedToLoader(prisma),
  //   subscribedToUserLoader: createSubscribedToUserLoader(prisma),
});
