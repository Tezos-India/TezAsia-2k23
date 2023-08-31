import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSubmit() {
    if (username.length < 4) return;
    router.push('/new-game');
  }

  // Initialize the user variable or remove the conditional block
  const user = false; // Change this to your actual user state

  if (user) {
    router.push('/');
    // return null; // You can also return some loading indicator or null here
  }

  return (
    <div>
      <label>Choose a name</label>
      <input type='text' value={username} onChange={handleChange} />
      <button onClick={handleSubmit}>{`Let's Go!`}</button>
    </div>
  );
}
