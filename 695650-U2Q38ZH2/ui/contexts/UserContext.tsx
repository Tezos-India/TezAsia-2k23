import React, { useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

type UserContextType = {
  id: string | null;
  username: string | null;
  updateUsername: (u: string) => void;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

import { generateId } from '../helpers';

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(() => {
    const n = Cookies.get('username');
    return n || null;
  });

  useEffect(() => {
    let uid = Cookies.get('uid');
    if (!uid) {
      uid = generateId();
      Cookies.set('uid', uid);
      setId(uid);
    } else {
      setId(uid);
    }

    if (!username) {
      let name: string | null = null;
      while (!name) {
        name = prompt('Choose a username');
      }
      Cookies.set('username', name);
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    if (username) {
      Cookies.set('username', username);
    }
  }, [username]);

  function updateUsername(u: string) {
    setUsername(u);
  }

  const value = { id, username, updateUsername };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
