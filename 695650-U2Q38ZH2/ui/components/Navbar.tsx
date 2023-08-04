import { useState } from "react";
import { connectWallet } from "../dapp/tezos";
import Form from "./Form";
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center gap-8 ml-[80px] mr-8  pt-6 pb-6">
      <div className="text-white text-6xl font-sans">EtherStrike</div>
      <Link rel="stylesheet" href="/Library" >
      <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] "  >Library</button>
      </Link>
      <Form />
    </div>
  );
}

