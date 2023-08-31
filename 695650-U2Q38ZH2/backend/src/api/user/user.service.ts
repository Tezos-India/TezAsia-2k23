import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";

export const upsertUser = async (userData: Prisma.UserCreateInput) => {
  return prisma.user.upsert({
    where: { walletAddress: userData.walletAddress },
    update: userData,
    create: {
      ...userData,
      gameStats: {
        create: {}
      }
    },
  });
};

export const getUserByWallet = async (walletAddress: string) => {
  return prisma.user.findUnique({
    where: { walletAddress },
  });
};
