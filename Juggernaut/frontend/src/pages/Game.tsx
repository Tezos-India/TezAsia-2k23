import { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { postScore } from '../utils/api'
import { useGlobalState } from '../utils/globalState'
import SecondaryButton  from '../components/SecondaryButton'

export default function Game() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { address } = useAccount()
  const [isPostingScore, setIsPostingScore] = useState(false)
  const { globalState, refetchData } = useGlobalState()
  const { tournamentId } = useParams()
  const navigate = useNavigate()
  const [score, setScore] = useState(0)

  
  const onLoad = () => {
    console.log('onLoad')
    // iframeRef.current?.contentWindow?.postMessage({ messageType: 'address', address })
  }

  const handleIframeMessage = async (event: any) => {
    // Handle messages received from the iFrame
    // console.log('Received message:', event)

    if (event.data.messageType === 'postScore') {
      const { score: _score } = event.data
      console.log('Score:', _score)
      setScore(_score)
      setIsPostingScore(true)
      await refetchData()
      
    }
  }

  useEffect(() => {
    console.log(globalState)

    ;(async() => {
      if (isPostingScore && tournamentId && address && parseInt(tournamentId) in globalState.tournaments) {
        const pendingGames =
          globalState.tournaments[parseInt(tournamentId)].leaderboard[address]
          ?.pendingGames
          
          // console.log('tournament: ', globalState.tournaments[parseInt(tournamentId)])
          // console.log('player: ', globalState.tournaments[parseInt(tournamentId)].leaderboard[address])
          // console.log('Pending games:', pendingGames)

          if (pendingGames && Object.keys(pendingGames).length > 0) {
            console.log("Posting score")
            const gameInstanceId = parseInt(Object.keys(pendingGames)[0])
            await postScore({ score, player: address, gameInstanceId })
            console.log("Score posted")
          }
      }
    })()
  
 }, [globalState])

  useEffect(() => {
    // Add event listener for postMessage events
    window.addEventListener('message', handleIframeMessage)

    return () => {
      // Clean up the event listener
      window.removeEventListener('message', handleIframeMessage)
    }
  }, [])

  return (
    <div>
      {isPostingScore && <div className='flex flex-col justify-center items-center my-56'>
        <h1 className='mb-5'>Your Score: {score}</h1>
        <p className="mb-5">Game over</p>
        <SecondaryButton text="Back to tournaments" onClick={() => navigate(`/tournament/${tournamentId}`)} />
      </div>}
      <iframe
        className={`-mx-20 my-10 w-screen ${isPostingScore ? 'hidden' : ''}`}
        height="1000px"
        src="https://funsurf-2048-game.netlify.app/"
        title="2048"
        onLoad={onLoad}
        ref={iframeRef}
      ></iframe>
    </div>
  )
}
