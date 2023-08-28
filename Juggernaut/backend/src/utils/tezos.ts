import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');

(async () => {
  if (!process.env.TEZOS_MANAGER_KEY) throw Error('TEZOS_MANAGER_KEY not set')
  Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey(process.env.TEZOS_MANAGER_KEY) });
})()

export type SendFromTreasuryParams = { address: string, amount: number }[]

export const sendFromTreasury = async (params: SendFromTreasuryParams) => {
  const treasury = await Tezos.contract.at('KT1PW3ntfDkFuyZkPJ3P41F95g7f2frKx6Pf')
  let batch = Tezos.batch()
  params.forEach(({ address, amount }) => {
    batch = batch.withContractCall(treasury.methods.withdraw(amount, address))
  })
  const op = await batch.send()
  return op.hash
}
