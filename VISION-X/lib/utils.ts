import toast from "react-hot-toast";
import { Fa2NftMetadata } from "../components/create/types";

type CreateNftMetadataProps = {
  name:string 
  description:string 
  tags:string[]  // will add tags later
  artifactUri:string
  creator:string 
  thumbnailUri:string
  mimeType:string 

}

export const createNftMetadata = ({name,artifactUri,creator,description,mimeType,tags}:CreateNftMetadataProps):Fa2NftMetadata => {
  return {
    name,
    description,
    tags,
    creators:[creator],
    artifactUri:"ipfs://"+artifactUri,
    formats:[{uri:"ipfs://"+artifactUri,mimeType:mimeType}],
    thumbnailUri:"ipfs://"+artifactUri,
    decimals:0,
    isBooleanAmount:false,
    shouldPreferSymbol:false,
    symbol:"TMNFT"
  }
}

export const ipfsToGatewayLink = (link:string) => {
  return link.replace("ipfs://","https://nftstorage.link/ipfs/")
}

export const copyToClipboard = (str:string) => {
  navigator.clipboard.writeText(str);
  toast.success("Copied to Clipboard!")
}