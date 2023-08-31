import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mintSFTOperation } from "../../../lib/fa2operations";
import { storeToIpfs } from "../../../lib/nftStorage";
import { createNftMetadata } from "../../../lib/utils";
import useContractStore from "../../../tezos/useContractStore";
import useWalletStore from "../../../tezos/useWalletStore";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import { Input } from "../../design/Input";
import { TextArea } from "../../design/TextArea";
import { mintSteps } from "./CreateNft";
import MintProgress from "./MintProgress";
import NftPreview from "./NftPreview";

type Props = {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  nftFile: File | null;
  nftThumbnail: string;
};

type FormData = {
  name: string;
  description: string;
  editions: number;
  tagString: string;
};

const CreateFungibleNft = ({ setStep, nftFile, nftThumbnail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [currentMintStep, setCurrentMintStep] = useState<number>(0);
  const [showMintProgress, setShowMintProgress] = useState<boolean>(false);
  const [currentAccountPkh, connectWallet] = useWalletStore((state) => [
    state.accountPkh,
    state.connectWallet,
  ]);
  const [sftContract, loadContracts] = useContractStore((state) => [
    state.sftContract,
    state.loadContracts,
  ]);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [mintError, setMintError] = useState<string>("");
  const handleFungibleMint: SubmitHandler<FormData> = async (data) => {
    setMintError("")
    setCurrentMintStep(0);
    try {
      if (nftFile) {
        if (!currentAccountPkh) {
          await connectWallet(true);
          loadContracts()
        }
        // get name and description from the form
        const { name, description, tagString, editions } = data;
        const tags = tagString.split(",");
        // get the mime type from the file
        const mimeType = nftFile?.type;
        setShowMintProgress(true); // Show mint progress component
        // upload the file to ipfs and get the artifactUri & thumbnail Uri
        console.log("Uploading file ");
        const fileCid = await storeToIpfs(nftFile);
        console.log("File uploaded successfully ");
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
          setCurrentMintStep(1);
          console.log("Uploading metadata");
          const metadataCid = await storeToIpfs(metadataBlob);
          console.log("Metadata uploaded successfully");
          // mint the nft
          console.log("Minting nft");
          console.log({ metadataCid, fileCid });
          if (sftContract && metadataCid) {
            setCurrentMintStep(2);
            const mintOp = await mintSFTOperation(
              "ipfs://" + metadataCid,
              sftContract,
              currentAccountPkh,
              editions
            );
            await mintOp?.confirmation(1);
            setTxHash(mintOp?.opHash);
            setCurrentMintStep(3);
            console.log(mintOp?.receipt());
          } else {
      throw Error("Something went wrong")
          }
        }
      }
    } catch (err:any) {
      setMintError(err?.message ? err.message : "Oops, something went wrong")
      setCurrentMintStep(-1);
      console.error(err);
    }
  };

  if (showMintProgress) {
    return (
      <MintProgress setShowMintProgress={setShowMintProgress}
        loading={currentMintStep}
        steps={mintSteps}
        txHash={txHash}
        error={mintError}
      
      />
    );
  }

  return (
    <div className="flex-wrap gap-8 flex justify-between">
      <div className="flex-1">
        <Heading className="mb-8">Add NFT Details</Heading>
        <form
          onSubmit={handleSubmit(handleFungibleMint)}
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
          <Input
            label="Editions"
            type="number"
            min={1}
            placeholder="Enter the number of tokens you want to mint"
            {...register("editions", {
              required: {
                value: true,
                message: "This field cannot be empty.",
              },
              min: {
                value: 1,
                message: "This value cannot be less than 0",
              },
            })}
            error={errors.editions?.message}
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
              onClick={() => setStep(1)}
              variant="primary"
              size="lg"
              outline
              className="flex-1 w-full"
            >
              Go Back
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

export default CreateFungibleNft;
