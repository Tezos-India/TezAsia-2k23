import { Chain, configureChains } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

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

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [etherlink],
  [publicProvider()]
)

export const metamask = new MetaMaskConnector({ chains })

export const shortenAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}