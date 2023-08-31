import { createWalletClient, http, Chain, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const etherlink: Chain = {
  id: 128123,
  name: 'Etherlink Testnet',
  network: 'etherlink',
  nativeCurrency: {
    decimals: 6,
    name: 'CTez',
    symbol: 'CTEZ',
  },
  rpcUrls: {
    public: { http: ['https://evm.ghostnet-evm.tzalpha.net'] },
    default: { http: ['https://evm.ghostnet-evm.tzalpha.net'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Blockscout',
      url: 'https://explorer.ghostnet-evm.tzalpha.net',
    },
    default: {
      name: 'Blockscout',
      url: 'https://explorer.ghostnet-evm.tzalpha.net',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain

if (!process.env.EVM_MANAGER_KEY) throw Error('EVM_MANAGER_KEY not set')
if (!process.env.EVM_MANAGER_ADDRESS) throw Error('EVM_MANAGER_ADDRESS not set')

export const managerAccount = privateKeyToAccount(
  process.env.EVM_MANAGER_KEY as `0x${string}`
)

export const managerAddress = process.env.EVM_MANAGER_ADDRESS as `0x${string}`

export const wallet = createWalletClient({
  account: managerAccount,
  chain: etherlink,
  transport: http(),
}).extend(publicActions)
