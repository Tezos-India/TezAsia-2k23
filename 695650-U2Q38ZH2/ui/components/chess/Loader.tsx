import React, { useState, useEffect } from "react";
import { useGame } from "@/contexts/GamesContext";
interface LoaderProps {
  color?: string;
  size?: string;
}

function Loader({ color, size }: LoaderProps) {
  const { st,jg,rg } = useGame() || {};
  let style = {
    borderTopColor: color || '#444',
    borderLeftColor: color || '#444',
    width: size || '40px',
    height: size || '40px'
  }
  return (
    <div className='loader-container'>
      <div className='loader' style={style}></div>
      {st && (
        <p style={{color:"white"}} >Starting The Game...</p>
      )}
       {jg && (
        <p style={{color:"white"}} >Joining The Game...</p>
      )}
       {rg && (
        <p style={{color:"white"}} >Joining Ramdom Game...</p>
      )}
    </div>
  )
}

export default Loader;
