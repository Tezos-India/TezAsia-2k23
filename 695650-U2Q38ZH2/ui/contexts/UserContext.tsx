// import React, { useState, useEffect, useContext } from 'react'
// import io from 'socket.io-client'

// const UserContext = React.createContext()

// export function useUser() {
//   return useContext(UserContext)
// }

// import { generateId } from '../helpers'

// export function UserProvider({ children }) {
//   const [id, setId] = useState()
//   const [username, setUsername] = useState(() => {
//     let n = localStorage.getItem('username')
//     if(n) return JSON.parse(n)
//     return null
//   })

  

//   useEffect(() => {
//     let uid = localStorage.getItem('uid')
//     if(!uid) {
//       let id = generateId()
//       localStorage.setItem('uid', id)
//       setId(id)
//     }else {
//       setId(uid)
//     }

//     if(!username) {
//       let name;
//       while(name == null || name === '') {
//         name = prompt('Choose a username')
//       }
//       localStorage.setItem("username", JSON.stringify(name))
//       setUsername(name)
//     }
//   }, [])

//   useEffect(() => {
//     if(!username) return
//     localStorage.setItem('username', JSON.stringify(username))
//   }, [username])

//   function updateUsername(u) {
//     setUsername(u)
//   }

//   const value = { id, username, updateUsername }
//   return (
//     <UserContext.Provider value={value}>
//       { children }
//     </UserContext.Provider>
//   )
// }


import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

import { generateId } from '../helpers';

export function UserProvider({ children }) {
  const [id, setId] = useState();
  const [username, setUsername] = useState(() => {
    const n = Cookies.get('username'); // Use Cookies.get
    if (n) return n;
    return null;
  });

  useEffect(() => {
    let uid = Cookies.get('uid'); // Use Cookies.get
    if (!uid) {
      let id = generateId();
      Cookies.set('uid', id); // Use Cookies.set
      setId(id);
    } else {
      setId(uid);
    }

    if (!username) {
      let name;
      while (name == null || name === '') {
        name = prompt('Choose a username');
      }
      Cookies.set('username', name); // Use Cookies.set
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    if (!username) return;
    Cookies.set('username', username); // Use Cookies.set
  }, [username]);

  function updateUsername(u) {
    setUsername(u);
  }

  const value = { id, username, updateUsername };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
