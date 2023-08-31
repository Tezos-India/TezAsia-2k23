import React from "react";
import { FiCopy, FiGlobe } from "react-icons/fi";
import { copyToClipboard } from "../../lib/utils";
import Card from "../design/Card";
import Tooltip from "../design/Tooltip";

type Props = {
  balance?: number;
  address?: string;
  network?: string;
};

const WalletInfo = ({ balance, address, network }: Props) => {
  return (
    <div className="flex flex-wrap items-center mt-8 gap-4 justify-between text-xl font-medium">
      {balance && (
        <div>
          <p>Balance</p>
          <Card className="flex items-center gap-1 px-">
            <img
              className="h-10 w-10 rounded-md"
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png"
            />
            <p className="bg-slate-300/50  py-2 px-3 rounded-md">
              {balance / 1000000} TEZ
            </p>
          </Card>
        </div>
      )}
      {address && (
        <div>
          <p>Address</p>
          <Card className="flex items-center gap-1">
            <Tooltip content="Copy Address">
              <button onClick={()=>copyToClipboard(address)}>
                <FiCopy className="h-10 rounded-md active:scale-95 duration-300 ease-out bg-blue-300/50 hover:bg-blue-300 border border-blue-500 text-blue-600 w-10 p-2" />
              </button>
            </Tooltip>
            <p className="bg-slate-300/50 py-2 px-3  truncate rounded-md">{window.innerWidth < 640 ? address.slice(0,6) + "..." + address.slice(-6,-1) : address }</p>
          </Card>
        </div>
      )}
      {network && (
        <div>
          <p>Network</p>
          <Card className="flex items-center gap-1">
            <FiGlobe className="h-10 rounded-md bg-green-600  text-white w-10 p-2" />
            <p className="bg-green-200 text-green-700  py-2 px-3 rounded-md">
              {network.toUpperCase()}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
