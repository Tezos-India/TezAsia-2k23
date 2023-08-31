import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { generateId } from '../helpers';

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

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const n = typeof window !== "undefined" ? localStorage.getItem('avatarName') : null;
    setUsername(n);

    let uid = typeof window !== "undefined" ? localStorage.getItem('uid') : null;
    if (!uid) {
      uid = generateId();
      if (typeof window !== "undefined") {
        localStorage.setItem('uid', uid);
      }
      setId(uid);
    } else {
      setId(uid);
    }
  }, []);

  function updateUsername(u: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem('avatarName', u);
    }
    setUsername(u);
  }

  const value = { id, username, updateUsername };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
