import React from "react";
import { TiFlash } from "react-icons/ti";
import Tooltip from "./Tooltip";
type Props = {};

const Logo = (props: Props) => {
  return (
      <div className="flex items-center cursor-pointer group gap-1 group">
        <TiFlash className="h-8 w-8 text-primary-500 group-hover:text-primary-400 group-hover:animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-900">TezMint</h1>
      </div>
  );
};

export default Logo;
