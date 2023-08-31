import React, { useEffect, useState } from "react";
import useWalletStore from "../../tezos/useWalletStore";
import Button from "../design/Button";
import Tooltip from "../design/Tooltip";
import NextLink from "../design/NextLink";
import { HiOutlineUserCircle } from "react-icons/hi";
type Props = {};

const ConnectWallet = (props: Props) => {
  const { connectWallet, accountPkh, isConnected } = useWalletStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    async () => await connectWallet(false);
  }, []);

  return (
    <div>
      {isConnected ? (
        <NextLink href="/profile">
          <Tooltip content="Go to Profile ">
            <Button
              outline
              variant="primary"
              onClick={() => setShowModal(true)}
            >
              <div className="flex items-center gap-2">
                <p className="hidden md:block">
                  {accountPkh.slice(0, 5) + " ... " + accountPkh.slice(-5, -1)}
                </p>
                <HiOutlineUserCircle className="h-6 w-6" />
              </div>
            </Button>
          </Tooltip>
        </NextLink>
      ) : (
        <Button variant="primary" onClick={() => connectWallet(true)}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
