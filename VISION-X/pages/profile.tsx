import { AccountInfo } from "@airgap/beacon-sdk";
import React, { useEffect, useMemo, useState } from "react";
import Heading from "../components/design/Heading";
import useWalletStore from "../tezos/useWalletStore";
import { motion } from "framer-motion";
import WalletInfo from "../components/profile/WalletInfo";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Button from "../components/design/Button";
import { HiOutlineLogout, HiOutlineRefresh } from "react-icons/hi";
import NftDetailsModal from "../components/profile/NftDetailsModal";
import NftCard from "../components/profile/NftCard";



const Profile = () => {
  const {
    isConnected,
    disconnectAccount,
    balance,
    accountPkh,
    network,
    sftsMinted,
    nftsMinted,
    getTokenBalances,
    connectWallet,
  } = useWalletStore();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [modalMetadata, setModalMetadata] = useState<any>(null);

  useEffect(() => {
    //get fresh data
    connectWallet(false);
    getTokenBalances();
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div>
        <h1 className="text-xl text-center">
          Please Connect your wallet to see your profile{" "}
        </h1>
      </div>
    );
  }

  console.log({sftsMinted});

  return (
    <>
      <motion.div initial={{y:100,opacity:0}} animate={{y:0,opacity:1}}  className="max-w-screen-lg mx-auto">
        <motion.div className="flex flex-wrap gap-8 items-center ">
          <Heading className="flex-1">My Profile</Heading>
          <div className="flex items-center gap-4">
            <Button onClick={()=>window.location.reload()} outline icon={<HiOutlineRefresh className="h-5 w-5" />}>
              Refresh
            </Button>
            <Button
              onClick={disconnectAccount}
              icon={<HiOutlineLogout className="h-5 w-5" />}
              variant="danger"
            >
              Disconnect
            </Button>
          </div>
        </motion.div>

        <WalletInfo network={network} address={accountPkh} balance={balance} />
        <motion.div className="mt-8 flex flex-col bg-white p-1 rounded-lg">
          <Tab.Group>
            <Tab.List className="flex border-b-2">
              <Tab className="focus:outline-none">
                {({ selected }: { selected: boolean }) => (
                  <div
                    className={clsx({
                      "bg-slate-100  rounded-t-lg": selected === true,
                    })}
                  >
                    <p className="px-2 md:px-4 py-2 text-sm sm:text-base relative top-0.5 ">
                      Non-fungible Tokens (NFT)
                    </p>
                    {selected && (
                      <motion.div
                        className="h-0.5 relative top-0.5 bg-blue-400 "
                        layoutId="tabHighlight"
                      />
                    )}
                  </div>
                )}
              </Tab>
              <Tab className="focus:outline-none">
                {({ selected }: { selected: boolean }) => (
                  <div
                    className={clsx({
                      "bg-slate-100 relative rounded-t-lg": selected === true,
                    })}
                  >
                    <p className="px-2 md:px-4 py-2 text-sm sm:text-base  relative top-0.5">
                      Semi-fungible Tokens (SFT)
                    </p>
                    {selected && (
                      <motion.div
                        className="h-0.5 relative top-0.5 bg-blue-400 z-10"
                        layoutId="tabHighlight"
                      />
                    )}
                  </div>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels className="rounded-lg p-4">
              <Tab.Panel className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {nftsMinted.length > 0 ? nftsMinted?.map((item: any,index:number) => (
                  <motion.div
                    animate={{y:[100,0],opacity:[0,1],scale:[0.6,1]}}
                    transition={{delay:0.2*index}}
                    onClick={() => {
                      setShowDetails(true);
                      setModalMetadata(item);
                    }}
                    key={item?.id}
                  >
                    <NftCard
                      imgSrc={item?.token?.metadata?.thumbnailUri}
                      name={item?.token?.metadata?.name}
                      description={item?.token?.metadata?.description}
                    />
                  </motion.div>
                )): "No Nfts found"}
              </Tab.Panel>
              <Tab.Panel className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {sftsMinted.length > 0 ? sftsMinted?.map((item: any,index:number) => (
                  <motion.div
                  animate={{y:[100,0],opacity:[0,1],scale:[0.6,1]}}
                  transition={{delay:0.2*index}}
                    onClick={() => {
                      setShowDetails(true);
                      setModalMetadata(item);
                    }}
                    key={item?.id}
                  >
                    <NftCard
                      imgSrc={item?.token?.metadata?.thumbnailUri}
                      name={item?.token?.metadata?.name}
                      description={item?.token?.metadata?.description}
                      amount={item?.balance}
                    />
                    
                  </motion.div>
                )):"No SFTs found"}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </motion.div>
      {showDetails && modalMetadata !== null && (
        <NftDetailsModal
          tokenData={modalMetadata}
          isOpen={showDetails}
          setIsOpen={setShowDetails}
        />
      )}
    </>
  );
};

export default Profile;
