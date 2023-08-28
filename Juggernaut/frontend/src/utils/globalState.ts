import { atom } from 'jotai'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { decodeFunctionData, getAddress } from 'viem'
import tournamentABI from './tournament-abi.json'

type GlobalState = {
  tournaments: Record<number, Tournament> // tournamentId -> tournament
  loaded: boolean
}

type Tournament = {
  id: number
  startTime: number
  endTime: number
  entryFee: number
  gameId: number
  gameName: string
  description: string
  prizePool: number
  highestScore: number
  totalEntries: number
  leaderboard: Record<string, { // player address -> leaderboard entry
    score: number
    pendingGames: Record<number, string> // gameInstanceId -> txnHash
  }>
}

const BLOCKSCOUT_API = 'https://explorer.ghostnet-evm.tzalpha.net/api?module=account&action=txlist&address=0x368688e8D456809408af67FE74B327B24bcbeC8a'


export const globalStateAtom = atom<GlobalState>({ tournaments: [], loaded: false })

export const useGlobalState = () => {

  // jotai state
  const [globalState, setGlobalState] = useAtom(globalStateAtom)

  const fetchData = async () => {
    console.log("⬇️Feteching data")
    // call api, parse state & update state
    const res = await fetch(BLOCKSCOUT_API)
    const rawData = await res.json()
    const txns = rawData.result.reverse().slice(1)
    const tournaments: Record<number, Tournament> = {}
    const tournamentOfGameInstance: Record<number, number> = {}
    let tournamentId = 0
    let gameInstanceId = 0

    txns.forEach((txn: any) => {
      if (txn.isError !== '0') return

      const { functionName, args } = decodeFunctionData({abi: tournamentABI, data: txn.input})
      if (!args || !args.length) return
      
      if (functionName === 'createTournament') {
        const [ _gameId, _entryFee, _startTime, _endTime ] = args
        tournaments[tournamentId] = {
          id: tournamentId,
          startTime: parseInt(_startTime as string),
          endTime: parseInt(_endTime as string),
          entryFee: parseInt(_entryFee as string) / 10 ** 18,
          gameId: parseInt(_gameId as string),
          gameName: "2048",
          description: "Merge, Match, Conquer: Master the Numbers in 2048!",
          prizePool: 0,
          highestScore: 0,
          totalEntries: 0,
          leaderboard: {}
        }
        tournamentId++

      } else if (functionName === "enterGame") {
        const [ _tournamentId ] = args
        const player = getAddress(txn.from as string)
        const tournament = tournaments[parseInt(_tournamentId as string)]
        tournament.totalEntries++
        tournament.prizePool += tournament.entryFee
        if (!(player in tournament.leaderboard)) {
          tournament.leaderboard[player] = {
            score: 0,
            pendingGames: {},
          }
        }
        tournament.leaderboard[player].pendingGames[gameInstanceId] = txn.hash
        tournamentOfGameInstance[gameInstanceId] = parseInt(_tournamentId as string)
        gameInstanceId++

      } else if (functionName === "postGameResult") {
        const [ _gameInstanceIdStr, _player, _scoreStr ] = args
        const player = getAddress(_player as string)
        const _gameInstanceId = parseInt(_gameInstanceIdStr as string)
        const _score = parseInt(_scoreStr as string)
        const _tournamentId = tournamentOfGameInstance[_gameInstanceId]

        const tournament = tournaments[_tournamentId]
        const playerData = tournament.leaderboard[(player as string)]

        tournament.highestScore = Math.max(tournament.highestScore, _score)

        playerData.score += _score
        delete playerData.pendingGames[_gameInstanceId]
      }
    })

    setGlobalState({ tournaments, loaded: true })
  }

  useEffect(() => {
    if (globalState.loaded) return
    fetchData()
  }, [])

  useEffect(() => {
    console.log(globalState)
  }, [globalState])

  // return state
  return { globalState, refetchData: fetchData}
}