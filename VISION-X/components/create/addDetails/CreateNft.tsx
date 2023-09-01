import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import { Input } from "../../design/Input";
import { TextArea } from "../../design/TextArea";
import NftPreview from "./NftPreview";
import { createNftMetadata } from "../../../lib/utils";
import useWalletStore from "../../../tezos/useWalletStore";
import { storeToIpfs } from "../../../lib/nftStorage";

import { mintNFTOperation } from "../../../lib/fa2operations";
import useContractStore from "../../../tezos/useContractStore";
import MintProgress from "./MintProgress";

type Props = {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  nftFile: File | null;
  nftThumbnail: string;
};

type FormData = {
  name: string;
  description: string;
  tagString: string;
};

export const mintSteps = [
  "Uploading File to IPFS 🚀",
  "Uploading Metadata to IPFS 🔥",
  "Minting your NFT ✨",
];

const CreateNft = ({ nftFile, nftThumbnail,setStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [currentMintStep, setCurrentMintStep] = useState<number>(0);
  const [showMintProgress, setShowMintProgress] = useState<boolean>(false);
  const [currentAccountPkh,connectWallet] = useWalletStore((state) => [state.accountPkh,state.connectWallet]);
  const [nftContract,loadContracts] = useContractStore((state) => [state.nftContract,state.loadContracts]);
  const [txHash,setTxHash] = useState<string | undefined>(undefined);
  const [mintError,setMintError] = useState<string>("");

  const handleMint: SubmitHandler<FormData> = async (data) => {
    setMintError("")
    setCurrentMintStep(0);
    try {
      if (nftFile) {
      if(!currentAccountPkh){
        await connectWallet(true);
        await loadContracts();
      } 
          
        // get name and description from the form
        const { name, description, tagString } = data;
        const tags = tagString.split(",");
        // get the mime type from the file
        const mimeType = nftFile?.type;
        setShowMintProgress(true); // Show mint progress component
        // upload the file to ipfs and get the artifactUri & thumbnail Uri
        console.log("Uploading file ");
        const fileCid = await storeToIpfs(nftFile);
        console.log("File uploaded successfully ");
        setCurrentMintStep(1)
        if (fileCid) {
          const metadata = createNftMetadata({
            name,
            artifactUri: fileCid,
            creator: currentAccountPkh,
            description,
            mimeType: mimeType ? mimeType : "",
            thumbnailUri: nftThumbnail,
            tags,
          });
          const metadataBlob = new Blob([JSON.stringify(metadata)]);
          console.log({ metadataBlob });
          // upload metadata to ipfs
          console.log("Uploading metadata");
          const metadataCid = await storeToIpfs(metadataBlob);
          console.log("Metadata uploaded successfully");
          // mint the nft
          console.log("Minting nft");
          console.log({ metadataCid, fileCid });
          if(!nftContract){
            await loadContracts();
          }
          if (nftContract && metadataCid) {
            setCurrentMintStep(2);
            const mintOp = await mintNFTOperation(
              "ipfs://" + metadataCid,
              nftContract,
              currentAccountPkh
            );
            await mintOp?.confirmation(1);
            setTxHash(mintOp?.opHash)
            setCurrentMintStep(3);
            console.log(mintOp?.receipt())
          } else {
          throw Error("Oops, something went wrong.");
          }
        }
      }
    } catch (err:any) {
      setMintError(err?.message ? err.message : "Oops, something went wrong please try again");
      setCurrentMintStep(-1);
      console.error(err);
    }
  };

  if(showMintProgress){
    return <MintProgress setShowMintProgress={setShowMintProgress} loading={currentMintStep} steps={mintSteps} txHash={txHash} error={mintError}/>
  }

  return (
    <div className="flex flex-wrap gap-4  justify-between">
      <div className="flex-1">
        <Heading className="mb-8">Add NFT Details</Heading>
        <form
          onSubmit={handleSubmit(handleMint)}
          className="max-w-lg flex flex-col gap-4"
        >
          <Input
            label="Name"
            placeholder="Name your NFT"
            {...register("name", {
              required: {
                value: true,
                message: "This field cannot be empty.",
              },
            })}
            error={errors.name?.message}
            className="w-full"
          />
          <TextArea
            rows={4}
            label="Description"
            placeholder="A brief description about your nft"
            {...register("description", {
              required: {
                value: true,
                message: "This field cannot be empty.",
              },
            })}
            error={errors.description?.message}
          />
          <Input
            {...register("tagString")}
            label="Tags ( Comma separated )"
            placeholder="Enter tags separeated by comma . Eg art,nft,gaming"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              onClick={()=>setStep(1)}
              variant="primary"
              size="lg"
              outline
              className="flex-1 w-full"
            >
              Change image
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1 w-full"
            >
              Mint my NFT 🚀
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-grow-0">
        <Heading className="mb-8">NFT Preview</Heading>
        <NftPreview
          tagString={watch("tagString")}
          description={watch("description")}
          name={watch("name")}
          thumbnail={nftThumbnail}
        />
      </div>
      
      
    </div>
  );
};
export default CreateNft;
