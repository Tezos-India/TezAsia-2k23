import express from 'express';
import * as UserController from './user.controller';

const router = express.Router();

router.post('/user', UserController.createUser);
router.get('/user/:walletAddress', UserController.getUserByWallet);

export default router;
