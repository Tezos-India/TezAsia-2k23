import express from 'express';
import * as GameStatsController from './gameStats.controller';

const router = express.Router();

router.get('/gameStats/:userId', GameStatsController.getGameStatsByUserId);
router.post('/gameStats/update', GameStatsController.updateGameStats);

export default router;
