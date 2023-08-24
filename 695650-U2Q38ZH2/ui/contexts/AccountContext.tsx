// AccountContext.tsx

import { createContext, useContext, ReactNode, useState } from 'react';

type AccountContextType = {
  account: string;
  setAccount: (account: string) => void;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AccountProvider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<string>("");

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within a AccountProvider');
  }
  return context;
};
