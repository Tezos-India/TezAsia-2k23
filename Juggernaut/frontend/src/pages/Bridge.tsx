import { useEffect, useState } from 'react'

import {
  useAccount,
  useBalance,
  useConnect,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
} from 'wagmi'

import Arrow from '../assets/graphics/bridge.svg'
import Ether from '../assets/walletIcons/etherLink.svg'
import Tezos from '../assets/walletIcons/tezos.svg'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import bridgeABI from '../utils/Bridge-abi.json'
import {
  clearActiveAccount,
  getActiveAccount,
  importCTez,
} from '../utils/tezos'
import { useTezosBalance } from '../utils/externalApi'

export default function Bridge() {
  const [bridgeState, setBridgeState] = useState<'import' | 'withdraw'>(
    'import'
  )
  const [tezosWalletConnected, setTezosWalletConnected] = useState(false)
  const [tezosAddress, setTezosAddress] = useState('')
  const [importAmount, setImportAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [isTransferDone, setIsTransferDone] = useState(false)


  const {
    connect: connectMetamask,
    isLoading: isMetamaskConnecting,
    connectors: [connector],
  } = useConnect()
  const { disconnect: disconnectMetamask } = useDisconnect()
  const { address: evmAddress, isConnected: isMetamaskConnected } = useAccount()
  const { data: evmBalance } = useBalance({ address: evmAddress })
  const tezosBalance = useTezosBalance(tezosAddress)

  const handleTezosLogin = async () => {
    if (!tezosWalletConnected) {
      console.log('connecting')
      let activeAccount = await getActiveAccount(true)
      if (activeAccount) {
        setTezosAddress(activeAccount.address)
        setTezosWalletConnected(true)
      }
      console.log(activeAccount)
    } else {
      await clearActiveAccount()
      setTezosWalletConnected(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      let activeAccount = await getActiveAccount()
      if (activeAccount) {
        setTezosAddress(activeAccount.address)
        setTezosWalletConnected(true)
      }
    })()
  }, [])

  useEffect(() => {
    if (bridgeState === 'import') {
      setWithdrawAmount(importAmount)
    } else {
      setImportAmount(withdrawAmount * 0.98)
    }
  }, [importAmount, withdrawAmount, bridgeState])

  const { config } = usePrepareContractWrite({
    address: '0x2CC1E8428177926Fe48EA8Ae162f3C9563a293E9',
    abi: bridgeABI,
    functionName: 'lock',
    args: [tezosAddress],
    value: withdrawAmount ? BigInt(withdrawAmount * 10 ** 18) : BigInt(0),
  })
  const { writeAsync } = useContractWrite(config)

  const handleTransferToken = async () => {
    if (
      !isMetamaskConnected ||
      !tezosWalletConnected ||
      !tezosAddress ||
      !evmAddress ||
      !importAmount ||
      !withdrawAmount
    )
      return
    if (bridgeState === 'import') {
      console.log('Importing...')
      await importCTez({
        evmAddress,
        amount: Math.round(importAmount * 10 ** 6),
      })
    } else {
      console.log('Withdrawing...')
      await writeAsync?.()
    }
    setIsTransferDone(true)
  }

  return (
    <div className="mb-60 mt-8">
      {isTransferDone && (
        <div className="toast">
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>CTez transferred! You should recieve it in your wallet in a minute.</span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4">Bridge</h2>
        {(!isMetamaskConnected || !tezosWalletConnected) && (
          <p>Connect both wallets to continue</p>
        )}

        <div className="mt-4 flex flex-row gap-8">
          {isMetamaskConnected ? (
            <div>
              <p>
                ✅ Metamask connected
                <br />
                {evmAddress?.slice(0, 6) + '...' + evmAddress?.slice(-4)}
              </p>
              <p
                className="cursor-pointer underline"
                onClick={() => disconnectMetamask()}
              >
                Disconnect
              </p>
            </div>
          ) : (
            <SecondaryButton
              text={isMetamaskConnecting ? 'Loading...' : 'Connect Metamask'}
              onClick={() => connectMetamask({ connector })}
              disabled={isMetamaskConnecting}
            />
          )}

          {tezosWalletConnected ? (
            <div>
              <p>
                ✅ Tezos wallet connected
                <br />
                {tezosAddress.slice(0, 6) + '...' + tezosAddress?.slice(-4)}
              </p>
              <p
                className="cursor-pointer underline"
                onClick={() => {
                  clearActiveAccount()
                  setTezosWalletConnected(false)
                  setTezosAddress('')
                }}
              >
                Disconnect
              </p>
            </div>
          ) : (
            <SecondaryButton
              text="Connect Tezos Wallet"
              onClick={handleTezosLogin}
            />
          )}
        </div>

        <div className="mt-16 flex flex-row justify-center gap-8">
          <div>
            <h4
              className={`${
                bridgeState === 'import' && 'text-gradient'
              } hover:text-gradient cursor-pointer`}
              onClick={() => setBridgeState('import')}
            >
              Import from Tezos
            </h4>
            {bridgeState === 'import' && (
              <div className="bg-gradient-secondary h-px"></div>
            )}
          </div>
          <div>
            <h4
              className={`${
                bridgeState === 'withdraw' && 'text-gradient'
              } hover:text-gradient cursor-pointer`}
              onClick={() => setBridgeState('withdraw')}
            >
              Withdraw from Etherlink
            </h4>
            {bridgeState === 'withdraw' && (
              <div className="bg-gradient-secondary h-px"></div>
            )}
          </div>
        </div>

        <div className="mb-8 mt-8">
          <div className="flex flex-col justify-center rounded-md bg-cardGray p-5">
            <div className="mb-4 flex flex-row items-center">
              <input
                name="tezos"
                value={importAmount}
                onChange={(e) => setImportAmount(parseFloat(e.target.value))}
                type="number"
                className="rounded-sm px-4 py-2 text-xl"
                disabled={bridgeState === 'withdraw'}
              />
              <div className="flex flex-row items-center gap-2 px-8">
                <img src={Tezos} alt="Tezos" width="20px" />
                <h3>Tezos</h3>
              </div>
            </div>
            {/* TODO */}
            <p className="text-sm">Your balance: {tezosBalance.toFixed(2)}</p>
          </div>

          <img
            src={Arrow}
            alt="arrow"
            width=""
            className={`mx-auto my-5 ${
              bridgeState === 'withdraw' && 'rotate-180'
            }`}
          />

          <div className="flex flex-col justify-center rounded-md bg-cardGray p-5">
            <div className="mb-4 flex flex-row items-center">
              <input
                name="etherlink"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                type="number"
                className="rounded-sm px-4 py-2 text-xl"
                disabled={bridgeState === 'import'}
              />
              <div className="flex flex-row items-center gap-2 px-8">
                <img src={Ether} alt="Tezos" width="20px" />
                <h3>Etherlink</h3>
              </div>
            </div>
            <p className="text-sm">
              Your balance: {evmBalance?.formatted || 0}
            </p>
          </div>
          <p className="mt-5">
            Bridging fee {bridgeState === 'withdraw' ? 2 : 0}%
          </p>
        </div>

        <PrimaryButton text="Transfer Tokens" onClick={handleTransferToken} />
      </div>
    </div>
  )
}
