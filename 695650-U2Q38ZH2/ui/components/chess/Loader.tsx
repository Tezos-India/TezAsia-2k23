import React, { useState, useEffect } from "react";
import { useGame } from "@/contexts/GamesContext";
import styles from "./Loader.module.css";
import { Button, Card } from 'flowbite-react';
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
    <div> 
          <ul className={styles.bubbles}>
    {[...Array(7)].map((_, index) => (
      <li key={index} className={styles.bubble}></li>
    ))}
  </ul>
  <Card className="max-w-sm bg-transparent border border-transparent border-opacity-0">
      {st && (
        <p className={styles.p}>Starting The Game...</p>
      )}
       {jg && (
        <p className={styles.p} >Joining The Game...</p>
      )}
       {rg && (
        <p className={styles.p}>Joining Ramdom Game...</p>
      )}
        </Card>
  
    </div>

  )
}

export default Loader;