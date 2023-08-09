import { useEffect, useState } from "react";
import { connectWallet, disconnect, getAccount } from "../dapp/tezos";
import Form from "./Form";
import Link from "next/link";

export default function Navbar() {
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const onDisconnectWallet = () => {
    disconnect();
    setAccount("");
  };

  return (
    <div className="flex justify-between items-center gap-8 ml-[80px] mr-8  pt-6 pb-6">
      <div className="text-white text-6xl font-sans">EtherStrike</div>
      <Link rel="stylesheet" href="/Library">
        <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] ">
          Library
        </button>
      </Link>
      {account ? (
        <button
          className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] "
          onClick={onDisconnectWallet}
        >
          {account}
        </button>
      ) : (
        <button
          className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] "
          onClick={onConnectWallet}
        >
          Connect Wallet
        </button>
      )}
      {/* <Form /> */}
    </div>
  );
}
