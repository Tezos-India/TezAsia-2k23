import clsx from 'clsx'
import React from 'react'

type Props = {
  direction?: 'row' | 'column'
  className?:string
  children:React.ReactNode
}

const Flex = (props: Props) => {
  return (
    <div className={
      clsx({
        'flex-col':props.direction === 'column',
      },
      'flex flex-wrap',
      props.className)
    }>{props.children}</div>
  )
}

export default Flex