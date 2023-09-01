import { RadioGroup } from "@headlessui/react";
import React, { Dispatch, SetStateAction } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import { NftTypes } from "../types";
import NftTypeCard from "./NftTypeCard";
import { BsStars } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { fadeIn } from "../../animations/variants";

type Props = {
  nftType: NftTypes;
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setType: Dispatch<SetStateAction<NftTypes>>;
};

const ChooseNftType = ({ nftType, setStep, setType }: Props) => {
  const router = useRouter();
  return (
      <motion.div
        key="chooseNft"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0,x:-50}}
        transition={{duration:0.5}} 
        className="max-w-screen-md mx-auto"
      >
        <RadioGroup value={nftType} onChange={setType}>
          <RadioGroup.Label>
            <Heading className="text-center">Choose your NFT Type</Heading>
          </RadioGroup.Label>
          <div className="grid sm:grid-cols-2  mt-8 gap-8">
            <RadioGroup.Option value="NFT">
              {({ checked }) => (
                <NftTypeCard
                  Icon={<HiStar className="h-8 w-8" />}
                  selected={checked}
                  title={"FA2 NFT"}
                  description={
                    "These are unique non-fungible tokens (NFTs). NFTs can be used to represent art , music , video or anything unique in nature."
                  }
                />
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="FUNGIBLE">
              {({ checked }) => (
                <NftTypeCard
                  Icon={<BsStars className="h-8 w-8" />}
                  selected={checked}
                  title={"FA2 SFT"}
                  description={
                    "These are semi-fungible tokens (SFTs) . SFTs can be used to represent assets  available in limited quantity. For example tickets , game items etc. "
                  }
                />
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
        <div className="flex mt-8 justify-between ">
          <Button
            onClick={() => router.push("/")}
            outline
            variant="primary"
            size="lg"
            className="flex items-center gap-1  justify-center"
          >
            Go Back
          </Button>
          <Button
            onClick={() => setStep(2)}
            variant="primary"
            size="lg"
            className="flex items-center gap-1 "
          >
            Upload Nft
          </Button>
        </div>
        <div className="my-8">
          <a
            href={"https://tezos.com/non-fungible-token/"}
            target="_blank"
            rel="noreferrer"
            className="text-center text-lg flex items-center gap-2 hover:text-primary-600 hover:underline underline-offset-4 duration-200 ease-out"
          >
            Still Confused ? Learn more about Nfts on Tezos Blockchain.{" "}
            <FiExternalLink className="h-5 w-5" />
          </a>
        </div>
      </motion.div>

  );
};

export default ChooseNftType;
