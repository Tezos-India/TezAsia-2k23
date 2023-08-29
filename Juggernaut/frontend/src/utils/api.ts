import { Address } from 'viem'

const BASE_URL = 'https://d3vp9jewucp6cq.cloudfront.net/'

export const claimCTez = async ({ address }: { address: Address }) => {
  const res = await fetch(BASE_URL + 'claimCTez', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  })
  return res.json()
}

export const postScore = async ({
  score,
  player,
  gameInstanceId,
}: {
  score: number
  player: Address
  gameInstanceId: number
}) => {
  const res = await fetch(BASE_URL + 'postScore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score, player, gameInstanceId }),
  })
  return res.json()
}
