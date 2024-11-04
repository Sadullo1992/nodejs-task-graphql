import { createMemberTypeLoader } from './member/loader.js';
import { createPostLoader } from './post/loader.js';
import { createProfileLoader } from './profile/loader.js';
import {
  createSubscribedToUserLoader,
  createUserSubscribedToLoader,
} from './user/loader.js';

export const handleDataLoader = (prisma) => ({
  profileLoader: createProfileLoader(prisma),
  postLoader: createPostLoader(prisma),
  memberTypeLoader: createMemberTypeLoader(prisma),
  userSubscribedToLoader: createUserSubscribedToLoader(prisma),
  subscribedToUserLoader: createSubscribedToUserLoader(prisma),
});
