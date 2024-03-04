import { PrismaClient } from '@prisma/client';
import { handleDataLoader } from '../loader.js';

export interface IContext {
  prisma: PrismaClient;
  loader: ReturnType<typeof handleDataLoader>;
}
