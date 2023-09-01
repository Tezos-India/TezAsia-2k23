type NftTypes = "NFT" | "FUNGIBLE"

type Fa2NftMetadata = {
  name: string;
  description: string;
  tags:string[]
  symbol:string
  artifactUri:string
  thumbnailUri:string 
  creators:string[]
  formats: {
    uri:string 
    mimeType:string 
  }[]
  decimals:number
  isBooleanAmount:boolean
  shouldPreferSymbol:boolean;
};

type Fa2FungibleMetadata = {
  name: string;
  description: string;
  externalLink: string;
  editions:number
}

export {NftTypes,Fa2FungibleMetadata,Fa2NftMetadata}

