import React, { useState, useEffect, useRef } from 'react'
import { parseTime } from '@/helpers';

export default function Timer({ time, running }) {
  const [timeLeft, setTimeLeft] = useState(time);
  const [jump, setJump] = useState(100)
  const intervalRef = useRef();
  useEffect(() => {
    setTimeLeft(time);
  }, [time]);
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    let lastTick = Date.now()
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - (Date.now() - lastTick));
      lastTick = Date.now()
    }, jump);
  }, [running]);
  return (
    <span 
      className='time-left'
      style={{ color: timeLeft < 1000 * 30 ? 'red' : 'black' }}>{
      parseTime(Math.max(timeLeft, 0), timeLeft < 1000 * 11)
    }</span>
  )
}