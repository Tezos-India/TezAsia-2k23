import { useEffect, useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useAccount } from 'wagmi'

import GameImg from '../assets/images/2048.jpg'
import Bronze from '../assets/trophies/bronze.svg'
import Gold from '../assets/trophies/gold.svg'
import Silver from '../assets/trophies/silver.svg'
import CTez from '../assets/walletIcons/ctez.svg'
import PrimaryButton from '../components/PrimaryButton'
import { shortenAddress } from '../utils/evm'
import { useGlobalState } from '../utils/globalState'
import tournamentAbi from '../utils/tournament-abi.json'

export default function Tournament() {
  const [countdown, setCountdown] = useState('')
  const { globalState } = useGlobalState()
  const { id } = useParams()
  const { address } = useAccount()
  const navigate = useNavigate()

  const { config } = usePrepareContractWrite({
    address: '0x368688e8D456809408af67FE74B327B24bcbeC8a',
    abi: tournamentAbi,
    functionName: 'enterGame',
    args: [0],
    value: BigInt(1 * 10 ** 18),
  })
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }
  }, [isSuccess])

  if (!id) return null

  const tournament = globalState.tournaments[parseInt(id)]

  const startTime = new Date(tournament?.startTime * 1000)
  const endTime = new Date(tournament?.endTime * 1000)

  const getLeaderboard = () => {
    const leaderboardLst: { address: string; score: number }[] = []
    if (!tournament) return leaderboardLst
    for (let _address in tournament.leaderboard) {
      leaderboardLst.push({
        address: _address,
        score: tournament.leaderboard[_address].score,
      })
    }
    leaderboardLst.sort((a, b) => b.score - a.score)
    return leaderboardLst
  }
  const leaderboard = useMemo(getLeaderboard, [globalState])

  const handlePlayNow = async () => {
    console.log('hi', { tournament, address, writeAsync })
    if (!tournament || !address || !writeAsync) return
    if (
      address in tournament.leaderboard &&
      Object.keys(tournament.leaderboard[address].pendingGames).length === 0
    ) {
      await writeAsync()
    }
    navigate(`/tournament/${id}/game`)
  }

  useEffect(() => {
    if (!tournament) return
    const interval = setInterval(() => {
      // update countdown
      const now = new Date()
      let _time = 0
      if (now >= startTime && now < endTime) {
        _time = (+endTime - +now) / 1000
      } else if (now < startTime) {
        _time = (+startTime - +now) / 1000
      }

      const _day = Math.round(_time / (24 * 60 * 60))
      const _hour = Math.round(_time / (60 * 60)) % 24
      const _min = Math.round(_time / 60) % 60
      const _sec = Math.round(_time) % 60
      const res = `${_day}d:${_hour}h:${_min}m:${_sec}s`
      setCountdown(res)
    }, 1000)

    return () => clearInterval(interval)
  }, [globalState])

  if (!tournament) return <h3>Loading...</h3>

  const now = new Date()
  let status
  // console.log({startTime, endTime, now})
  if (now >= startTime && now < endTime) {
    status = 'Active'
  } else if (now < startTime) {
    status = 'Starts In'
  } else {
    status = 'Ended!'
  }

  return (
    <div className="mb-60 mt-20">
      <div className="mb-32 flex flex-col gap-12 sm:flex-row lg:gap-32">
        <div className="flex-1">
          <img src={GameImg} alt="Game Image" />
        </div>

        <div className="flex flex-1 flex-col">
          <h4 className="mb-7">#Tournament {id}</h4>
          <h2 className="mb-3 text-white">{tournament.gameName}</h2>
          <p className="mb-7">{tournament.description}</p>
          <div className="mb-16 flex flex-row">
            <h4 className="mr-3">
              {status === 'Active'
                ? 'Ends In'
                : status === 'Starts In'
                ? 'Starts In'
                : 'Ended!'}
            </h4>
            <h4 className="font-bold text-themeBlue">
              {status === 'Ended' ? '' : countdown}
            </h4>
            <p
              className={`ml-auto leading-9 ${
                status === 'Active' ? 'text-activeGreen' : 'text-white'
              }`}
            >
              {status === 'Active' && 'Active'}
            </p>
          </div>
          {status === 'Active' && (
            <div className="flex flex-row items-center gap-10">
              <PrimaryButton
                disabled={isLoading}
                text={isLoading ? 'Loading...' : 'Play Now'}
                onClick={handlePlayNow}
              />
              <h4>1 CTez</h4>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-4">
        <div className="mr-20 flex flex-col items-center">
          <h2>{tournament.prizePool} CTez</h2>
          <h4>Prize Pool</h4>
        </div>

        <div className="mr-20 flex flex-col items-center">
          <h2>{tournament.highestScore}</h2>
          <h4>Highest Score</h4>
        </div>

        <div className="flex flex-col items-center">
          <h2>{tournament.totalEntries}</h2>
          <h4>Total Entries</h4>
        </div>
      </div>

      <div className="my-32">
        <h2 className="mx-auto mb-5 w-fit">Leaderboard</h2>

        <div className="mb-5 flex flex-row justify-center gap-32">
          <div className="mt-32 flex flex-col items-center justify-center">
            <img src={Silver} width="100px" alt="Silver Trophy" />
            <h4>{shortenAddress(leaderboard[1]?.address) || '---'}</h4>
            <p className="mb-4">{leaderboard[1]?.score || '---'}</p>
            <div className="flex flex-row items-center gap-2">
              <img src={CTez} width="20px" alt="CTez" />
              <p>{(0.3 * tournament.prizePool).toFixed(2)}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={Gold} width="100px" alt="Gold Trophy" />
            <h4>{shortenAddress(leaderboard[0]?.address) || '---'}</h4>
            <p className="mb-4">{leaderboard[0]?.score || '---'}</p>
            <div className="flex flex-row items-center gap-2">
              <img src={CTez} width="20px" alt="CTez" />
              <p>{(0.5 * tournament.prizePool).toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-32 flex flex-col items-center">
            <img src={Bronze} width="100px" alt="Bronze Trophy" />
            <h4>{shortenAddress(leaderboard[2]?.address) || '---'}</h4>
            <p className="mb-4">{leaderboard[2]?.score || '---'}</p>
            <div className="flex flex-row items-center gap-2">
              <img src={CTez} width="20px" alt="CTez" />
              <p>{(0.2 * tournament.prizePool).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      {leaderboard.length > 3 && (
        <div className="overflow-x-auto bg-tableBlue">
          <table className="table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Username</th>
                <th>Points</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(3).map((player, i) => (
                <tr>
                  <th>{i + 4}</th>
                  <td>{shortenAddress(player.address)}</td>
                  <td>{player.score}</td>
                  <td>
                    <div className="flex flex-row items-center gap-2">
                      <img src={CTez} width="20px" alt="CTez" />
                      <p>0</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
