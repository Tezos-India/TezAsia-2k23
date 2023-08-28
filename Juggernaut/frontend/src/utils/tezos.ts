import { AccountInfo, ColorMode, NetworkType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'

const DAPP_NAME = 'FunSurf'
const RPC_URL = 'https://ghostnet.smartpy.io'
const NETWORK = 'ghostnet'
const CTEZ_CONTRACT_ADDRESS = 'KT1Q4ecagDAmqiY3ajvtwfNZyChWy86W7pzb'
const TREASURY_CONTRACT_ADDRESS = 'KT1PW3ntfDkFuyZkPJ3P41F95g7f2frKx6Pf'
const DEPOSIT_CONTRACT_ADDRESS = 'KT1HJphVV3LUxqZnc7YSH6Zdfd3up1DjLqZv'

const Tezos = new TezosToolkit(RPC_URL)

const wallet = new BeaconWallet({
  name: DAPP_NAME,
  preferredNetwork: NETWORK as NetworkType,
  colorMode: 'light' as ColorMode,
})

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet)

const getActiveAccount = async (request: boolean = false): Promise<AccountInfo|undefined> => {
  const activeAccount = await wallet.client.getActiveAccount()

  // no active account, we need permissions first
  if (!activeAccount && request) {
    await wallet.requestPermissions()
    return getActiveAccount()
  }

  return activeAccount
}

const clearActiveAccount = async () => {
  return wallet.client.clearActiveAccount()
}

const getCTezContract = async () => {
  return Tezos.wallet.at(CTEZ_CONTRACT_ADDRESS)
}

const getCTezContractStorage = async () => {
  return (await getCTezContract()).storage()
}

const getDepositContract = async () => {
  return Tezos.wallet.at(DEPOSIT_CONTRACT_ADDRESS)
}

const getDepositContractStorage = async () => {
  return (await getCTezContract()).storage()
}

const getTreasuryContract = async () => {
  return Tezos.wallet.at(TREASURY_CONTRACT_ADDRESS)
}

const getTreasuryContractStorage = async () => {
  return (await getCTezContract()).storage()
}

const importCTez = async ({
  evmAddress,
  amount,
}: {
  evmAddress: `0x${string}`
  amount: number
}) => {
  const [depositContract, ctezContract] = await Promise.all([
    getDepositContract(),
    getCTezContract(),
  ])
  const res = await Tezos.wallet
    .batch()
    .withContractCall(
      ctezContract.methods.approve(DEPOSIT_CONTRACT_ADDRESS, amount)
    )
    .withContractCall(
      depositContract.methods.deposit(amount, evmAddress, 30000)
    )
    .send()
  return res.opHash
}

export {
  Tezos,
  wallet,
  getActiveAccount,
  clearActiveAccount,
  getCTezContract,
  getCTezContractStorage,
  getDepositContract,
  getDepositContractStorage,
  getTreasuryContract,
  getTreasuryContractStorage,
  importCTez,
}
