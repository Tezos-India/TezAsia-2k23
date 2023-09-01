import React from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../design/Button";
import Logo from "../design/Logo";
import NextLink from "../design/NextLink";
import ConnectWallet from "./ConnectWallet";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <header className="p-4 md:px-8  sticky border-b  border-gray-300">
        <nav className="flex items-center mx-auto justify-between ">
          <NextLink href="/">
            <Logo />
          </NextLink>
          <div className="flex items-center gap-4">
            
            <NextLink href={"/create"}>
              <Button outline className="flex items-center gap-2">
                <span className="hidden sm:block">
                Create Nft
                </span>
                <FiPlus className="h-6 w-6"/></Button>
            </NextLink>

            <ConnectWallet />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
