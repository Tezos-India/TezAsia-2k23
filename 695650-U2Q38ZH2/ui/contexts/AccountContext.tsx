import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type AccountContextType = {
  account: string;
  setAccount: (account: string) => void;
  avatarName: string | null;
  setAvatarName: (name: string | null) => void;
  avatarId: string | null;
  setAvatarId: (id: string | null) => void;
};

const defaultValues: AccountContextType = {
  account: "",
  setAccount: () => {},
  avatarName: null,
  setAvatarName: () => {},
  avatarId: null,
  setAvatarId: () => {},
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const isBrowser = typeof window !== "undefined";

export const AccountProvider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<string>(() =>
    isBrowser ? localStorage.getItem("account") || "" : ""
  );
  const [avatarName, setAvatarName] = useState<string | null>(() =>
    isBrowser ? localStorage.getItem("avatarName") : null
  );
  const [avatarId, setAvatarId] = useState<string | null>(() =>
    isBrowser ? localStorage.getItem("avatarId") : null
  );

  useEffect(() => {
    if (isBrowser) localStorage.setItem("account", account);
  }, [account]);

  useEffect(() => {
    if (isBrowser) {
      if (avatarName) {
        localStorage.setItem("avatarName", avatarName);
      } else {
        localStorage.removeItem("avatarName");
      }
    }
  }, [avatarName]);

  useEffect(() => {
    if (isBrowser) {
      if (avatarId) {
        localStorage.setItem("avatarId", avatarId);
      } else {
        localStorage.removeItem("avatarId");
      }
    }
  }, [avatarId]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        avatarName,
        setAvatarName,
        avatarId,
        setAvatarId,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
