import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/user', async (req: Request, res: Response) => {
  try {
    const { walletAddress, avatarName } = req.body;
    const result = await prisma.user.create({
      data: {
        walletAddress,
        avatarName
      }
    });
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      console.error('An unknown error occurred:', err);
      res.sendStatus(500);
    }
  }
});

app.get('/user/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        walletAddress
      }
    });
    if (user === null) {
      res.status(404).send(`No user found with wallet address ${walletAddress}`);
    } else {
      res.json(user);
    }
  } catch (err: unknown) {
    console.error('An error occurred while fetching the user:', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
