import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';

export const createUser = async (userData: Prisma.UserCreateInput) => {
  return prisma.user.create({ data: userData });
};

export const getUserByWallet = async (walletAddress: string) => {
  return prisma.user.findUnique({
    where: { walletAddress }
  });
};
