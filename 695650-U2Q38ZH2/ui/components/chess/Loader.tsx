import React from 'react';
import Image from "next/image";
interface LoaderProps {
  color?: string;
  size?: string;
}

function Loader({ color, size }: LoaderProps) {
  let style = {
    borderTopColor: color || '#444',
    borderLeftColor: color || '#444',
    width: size || '40px',
    height: size || '40px'
  }
  return (
    <div className='loader-container'>
      <div className='loader' style={style}></div>
    </div>
  )
}

export default Loader;
