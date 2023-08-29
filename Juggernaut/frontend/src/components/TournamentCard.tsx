import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import GameImg from '../assets/images/2048.jpg'

type PropsType = {
  game: string
  tournament: string
  startTime: Date
  endTime: Date
}

export default function TournamentCard({
  game,
  tournament,
  startTime,
  endTime,
}: PropsType) {

  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      // update countdown
      const now = new Date()
      let _time = 0
      if(now >= startTime && now < endTime){
        _time = (+endTime - +now) / 1000
      }else if(now < startTime){
        _time = (+startTime - +now) / 1000
      }

      const _day = Math.round(_time / (24*60*60))
      const _hour = Math.round(_time / (60*60)) % 24
      const _min = Math.round(_time / 60) % 60
      const _sec = Math.round(_time) % 60
      const res = `${_day}d:${_hour}h:${_min}m:${_sec}s`
      setCountdown(res)
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  
  const now = new Date()
  let status
  // console.log({startTime, endTime, now})
  if(now >= startTime && now < endTime){
    status = "Active"
  }else if(now < startTime){
    status = "Starts In"
  }else{
    status = "Ended!"
  }

  return (
    <Link to={`/tournament/${tournament.split(' ')[1]}`}>
      <div className="pop-on-hover flex flex-col rounded-lg bg-cardGray p-8">
        <img src={GameImg} alt="Game" width="250px" className="mb-4" />
        <h3 className="mx-auto ">{game}</h3>
        <p className="mx-auto mb-8 font-light">{tournament}</p>
        <p className="mx-auto mb-3 font-semibold text-themeBlue ">{status === 'Ended'? '': countdown}</p>
        <p className={`mx-auto font-medium ${status === 'Active'? 'text-activeGreen' : 'text-white'} `}>{status}</p>
        {/* <p>{startTime.toISOString()}</p> */}
      </div>
    </Link>
  )
}
