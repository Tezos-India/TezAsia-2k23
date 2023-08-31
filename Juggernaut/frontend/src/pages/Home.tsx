import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useAccount, useBalance, useConnect } from 'wagmi'

import GameCard from '../components/GameCard'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import TournamentCard from '../components/TournamentCard'
import { useGlobalState } from '../utils/globalState'
import { claimCTez } from '../utils/api'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const { address } = useAccount()
  const {
    connectAsync,
    connectors: [connector],
  } = useConnect()
  const { data: balance } = useBalance({ address })

  const { globalState } = useGlobalState()

  useEffect(() => {
    console.log('globalState', globalState)
  }, [globalState])

  const handleFreeClaim = async () => {
    setIsLoading(true)
    if (!address) {
      await connectAsync({ connector })
    } else {
      await claimCTez({ address })
      setClaimed(true)
    }
    setIsLoading(false)
  }

  return (
    <div className="mb-60 mt-20">
      {claimed && (
        <div className="toast">
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>🎉 You received 1 CTez</span>
          </div>
        </div>
      )}
      <div
        className={`mb-28 flex flex-col items-center ${
          claimed || !!balance?.value ? 'hidden' : ''
        }`}
      >
        <h2 className="mb-5">{address? 'Get CTez': 'Connect wallet'} to get started</h2>
        <p className="max-w-lg text-center">
          You will need CTez token to participate in tournaments.{' '}
          {address ? "You can claim 10 CTez for free or import CTez from tezos." : "Connect your wallet to claim free 10 CTez."}
        </p>
        <div className="mt-10 flex flex-row gap-8">
          {address? (<>
            <PrimaryButton
              disabled={isLoading || claimed}
              text={isLoading ? 'Claiming...' : 'Claim free CTez'}
              onClick={handleFreeClaim}
            />
            <Link to="/bridge">
              <SecondaryButton text="Import CTez" />
            </Link>
            </>
          ) : (
            <PrimaryButton
              text="Connect Wallet"
              onClick={handleFreeClaim}
            />
          )}
          
        </div>
      </div>

      <div className="mb-28">
        <h2 className="mb-10">Tournaments</h2>
        <div className="flex flex-row flex-wrap gap-16">
          {Object.values(globalState.tournaments).map((tournament, i) => 
            <TournamentCard
              key={i}
              game={tournament.gameName}
              tournament={`#Tournament ${tournament.id}`}
              startTime={new Date(tournament.startTime * 1000)}
              endTime={new Date(tournament.endTime * 1000)}
            />
          )}
          
        </div>
      </div>

      <div>
        <h2 className="mb-10">Available Games</h2>
        <div className="flex flex-row flex-wrap gap-16">
          <GameCard
            game="2048"
            description="Merge, Match, Conquer: Master the Numbers in 2048!"
          />
        </div>
      </div>
    </div>
  )
}
