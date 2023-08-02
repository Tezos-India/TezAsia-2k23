import { Request, Response } from 'express';
import * as UserService from './user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.json(user);
  } catch (err) {
    // Handle error
    console.error(err);
    res.sendStatus(500);
  }
};

export const getUserByWallet = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserByWallet(req.params.walletAddress);
    if (user === null) {
      res.status(404).send(`No user found with wallet address ${req.params.walletAddress}`);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
