// import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import GameImg from '../assets/images/2048.jpg'

type PropsType = {
  game: string
  description: string
  // onClick?: (() => void) | ((e: any) => Promise<void>)
}

export default function GameCard({ game, description }: PropsType) {
  return (
    <div className="pop-on-hover flex w-80 flex-col rounded-lg bg-cardGray p-8">
      <img src={GameImg} alt="Game" className="mb-4" />
      <h3 className="mb-3">{game}</h3>
      <p className="justify-start">{description}</p>
    </div>
  )
}
