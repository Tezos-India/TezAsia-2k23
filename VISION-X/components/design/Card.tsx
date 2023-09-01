import clsx from 'clsx'
import React from 'react'

type Props = {
  className?:string
  children:React.ReactNode
}

const Card = (props: Props) => {
  return (
    <div className={clsx(
      'bg-white rounded-lg border border-gray-300 p-1',
      props.className
    )
    }>{props.children}</div>
  )
}

export default Card