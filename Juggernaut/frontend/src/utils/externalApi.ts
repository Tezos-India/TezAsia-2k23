import { useState, useEffect } from 'react';
import { getActiveAccount } from './tezos'

export const useTezosBalance = (address: string) => {
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const getBalance = async () => {
      const account = await getActiveAccount()
      const response = await fetch(`https://api.ghostnet.tzkt.io/v1/tokens/balances?token.contract=KT1Q4ecagDAmqiY3ajvtwfNZyChWy86W7pzb&account=${account?.address}&select=account,balance`)
      const data = await response.json()
      const balance = data[0]?.balance
      if (balance) setBalance(balance / 1000000)
    }
    getBalance();
  }, [address]);

  return balance;
}