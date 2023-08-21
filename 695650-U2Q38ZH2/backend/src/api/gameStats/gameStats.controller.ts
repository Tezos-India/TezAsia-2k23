import { Request, Response } from 'express';
import * as GameStatsService from './gameStats.service';

export const getGameStatsByUserId = async (req: Request, res: Response) => {
  try {
    const gameStats = await GameStatsService.getGameStatsByUserId(parseInt(req.params.userId, 10));
    res.json(gameStats);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const updateGameStats = async (req: Request, res: Response) => {
  try {
    const { userId, result } = req.body;
    const updatedStats = await GameStatsService.updateGameStats(userId, result);
    res.json(updatedStats);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
