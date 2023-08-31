import { prisma } from '../../config/prisma';


export const getGameStatsByUserId = async (userId: number) => {
  return prisma.gameStats.findUnique({
    where: { userId }
  });
};

export const updateGameStats = async (userId: number, result: 'win' | 'loss' | 'draw') => {
  const userStats = await getGameStatsByUserId(userId);

  if (!userStats) {
    throw new Error('User stats not found');
  }

  switch (result) {
    case 'win':
      return prisma.gameStats.update({
        where: { userId },
        data: { gamesPlayed: userStats.gamesPlayed + 1, gamesWon: userStats.gamesWon + 1 }
      });

    case 'loss':
      return prisma.gameStats.update({
        where: { userId },
        data: { gamesPlayed: userStats.gamesPlayed + 1, gamesLost: userStats.gamesLost + 1 }
      });

    case 'draw':
      return prisma.gameStats.update({
        where: { userId },
        data: { gamesPlayed: userStats.gamesPlayed + 1, gamesDrawn: userStats.gamesDrawn + 1 }
      });

    default:
      throw new Error('Invalid game result');
  }
};
