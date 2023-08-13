import React, { useState } from 'react'
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('')
 
  const router = useRouter();
  function handleChange(e) {
    setUsername(e.target.value)
  }
  function handleSubmit() {
    if(username.length < 4) return
    router.push('/new-game');
  }

  if (user) {
    router.push('/');
    // return null; // You can also return some loading indicator or null here
  }
  
  return (
    <div>
      <label>Choose a name</label>
      <input type='text' value={username} onChange={handleChange} />
      <button onClick={handleSubmit}>Let's Go!</button>
    </div>
  )
}