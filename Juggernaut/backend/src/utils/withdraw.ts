import { promises as fs } from 'fs'
import { decodeFunctionData } from 'viem'
import bridgeABI from './bridge-abi.json'
import { sendFromTreasury, SendFromTreasuryParams } from './tezos'


const BLOCKSCOUT_API = 'https://explorer.ghostnet-evm.tzalpha.net/api?module=account&action=txlist&address=0x2CC1E8428177926Fe48EA8Ae162f3C9563a293E9'

setInterval(async () => {
  console.log('Checking for new withdraw requests...')
  // get evm lock txns from blockscout
  const res = await fetch(BLOCKSCOUT_API)
  const data = await res.json()

  // check for new txns (keep last txn id in a file)
  const { lastProcessedBlock } = JSON.parse(await fs.readFile('src/utils/withdrawData.json', "utf-8"))
  console.log(lastProcessedBlock)

  // if new txn found, get tezos address, and amount
  const newTxns = data.result.filter((txn: any) => parseInt(txn.blockNumber) > lastProcessedBlock)
  console.log(newTxns.length)

  // send tezos to address using taquito
  const payload: SendFromTreasuryParams = []
  newTxns.forEach(async (txn: any) => {
    const amount = Math.round((txn.value) / (10 ** 12) * 0.98)
    try {
      const {functionName, args} = decodeFunctionData({abi: bridgeABI, data: txn.input})
      if (functionName !== 'lock' || !amount) return
      const tezosAddress = args?.[0] as string
      // transfer ctez on tezos
      console.log(`Sending ${amount} tez to ${tezosAddress}...`)
      payload.push({address: tezosAddress, amount})
    } catch (e) {
      console.log(`Cannot decode transaction at ${txn.blockNumber}. Skipped.`)
    }
  })

  try{
    if (payload.length) {
      const latestProcessedBlock = parseInt(newTxns[0].blockNumber)
      await fs.writeFile(
        'src/utils/withdrawData.json',
        JSON.stringify({lastProcessedBlock: latestProcessedBlock})
      )
      await sendFromTreasury(payload)
    }
  } catch (e) {
    console.log(JSON.stringify(e))
  }  
}, 20000)

export default () => console.log('Withdraw service started')
