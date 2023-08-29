import { useEffect } from 'react'

import { MetaMaskSDK } from '@metamask/sdk'
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'

import { etherlink } from '../utils/evm'

const MMSDK = new MetaMaskSDK({ dappMetadata: { name: 'FunSurf' } })
try {
  MMSDK.getProvider() // You can also access via window.ethereum
} catch (e) {}

export default function WalletButton() {
  const {
    connect,
    connectors: [connector],
    error: connectError,
    isLoading,
  } = useConnect()
  const { disconnect, error: disconnectError } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  const connectWallet = async () => {
    console.log('connect wallet clicked')
    // disconnect()
    connect({ connector: connector })
  }
  const disconnectWallet = () => {
    console.log('disconnect wallet clicked')
    disconnect()
  }

  const disabled = isLoading
  const onClick = isConnected ? disconnectWallet : connectWallet

  useEffect(() => {
    if (connectError) {
      console.log(connectError)
    }
    if (disconnectError) {
      console.log(disconnectError)
    }
  }, [connectError, disconnectError])

  useEffect(() => {
    if (isConnected) {
      console.log('connected', address, window.ethereum)
      window.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x1F47B',
            rpcUrls: etherlink.rpcUrls.default.http,
            chainName: 'Etherlink Testnet',
            nativeCurrency: {
              decimals: 18,
              name: 'CTez',
              symbol: 'CTEZ',
            },
            blockExplorerUrls: [etherlink.blockExplorers?.default.url],
          },
        ],
      })
    }
  }, [address, isConnected])
  useEffect(() => {
    console.log(balance)
  }, [balance])

  return (
    <div
      className={`whitespace-nowrap bg-gradient hover:scale-120 m-4 ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } group rounded-full p-px font-semibold`}
      onClick={disabled ? undefined : onClick}
    >
      <div
        className={`${
          disabled ? '' : 'hover:bg-gradient'
        } rounded-full bg-bgBlack px-8 py-3`}
      >
        <p className={`font-primary ${disabled ? 'text-disabledGray' : ''}`}>
          {disabled ? (
            'Loading...'
          ) : !isConnected ? (
            'Connect'
          ) : (
            <>
              <span className="group-hover:hidden">
                {balance?.formatted || 0} CTez
              </span>
              <span className="hidden group-hover:inline">Disconnect</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
