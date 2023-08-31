import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { wallet } from './utils/evm'
import { Address, isAddress } from 'viem'
import { sendCTez } from './utils/contractCalls'
import withdraw from './utils/withdraw'
import tournamentABI from './utils/tournament-abi.json'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))
withdraw()

app.get('/', async (req: Request, res: Response) => {
  const blockNumber = await wallet.getBlockNumber()
  res.send('Running at block number: ' + blockNumber.toString())
})

app.get('/getBalance/:address', async (req: Request, res: Response) => {
  const { address } = req.params
  const balance = await wallet.getBalance({ address: address as Address })
  res.send((balance / 10n ** 18n).toString())
})

app.post('/claimCTez', async (req: Request, res: Response) => {
  const { address } = req.body
  if (!address || !isAddress(address)) {
    res.status(400).send({ error: 'Invalid address' })
    return
  }
  try {
    const hash = await sendCTez(address as Address, 10n * 10n ** 18n)
    res.send({ hash })
  } catch (e) {
    res.status(400).send({ error: e })
  }
})

app.post('/postScore', async(req: Request, res: Response) => {
  const { score, player, gameInstanceId } = req.body
  console.log("Posting score for player", player, "with score", score, "for game instance", gameInstanceId)
  if (!player || !score || !gameInstanceId) {
    res.status(400).send({ error: 'Invalid parameters' })
    return
  }
  try {
    const hash = await wallet.writeContract({
      abi: tournamentABI,
      address: '0x368688e8D456809408af67FE74B327B24bcbeC8a',
      functionName: "postGameResult",
      args: [gameInstanceId, player, score]
    })
    res.send({ hash })
  } catch (e) {
    res.status(400).send({ error: e })
  }
})

app.listen(3000, (): void => {
  console.log('SERVER IS UP ON PORT:', 3000)
})
