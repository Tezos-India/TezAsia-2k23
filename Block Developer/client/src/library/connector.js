import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { LedgerConnector } from '@web3-react/ledger-connector'



const POLLING_INTERVAL = 12000
var RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213'
};


// export const injected = new InjectedConnector({ supportedChainIds: [1, 3,4, 5, 42] })
export const injected = new InjectedConnector({ supportedChainIds: [1,4] })





export const network = new NetworkConnector({
    urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
    defaultChainId: 1
  })



export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})





  export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[1],
    appName: 'polyess',
    supportedChainIds: [1]
  })
  
  // export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL })
  