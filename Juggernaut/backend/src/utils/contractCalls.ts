import { Address } from 'viem'
import { wallet } from './evm'

export const sendCTez = async (to: Address, amount: bigint) => {
  const hash = await wallet.sendTransaction({
    to,
    value: BigInt(amount),
  })
  // const res = await wallet.waitForTransactionReceipt({
  //   hash,
  //   timeout: 30_000,
  // })
  return hash
}
