import React from 'react'

type Props = {
  className?:string
  children:React.ReactNode
}

const Heading = ({children,className}: Props) => {
  return (
    <h1 className={`font-bold text-xl sm:text-3xl ${className}`}>{children}</h1>
  )
}

export default Heading