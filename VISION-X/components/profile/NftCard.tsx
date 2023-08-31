import React from "react";
import { ipfsToGatewayLink } from "../../lib/utils";
import Tooltip from "../design/Tooltip";

type Props = {
  imgSrc: string;
  name: string;
  description: string;
  amount?:number
};

const NftCard = ({ name, imgSrc, description,amount }: Props) => {
  return (
    <Tooltip content="Click to view details">
      <div className="rounded-lg hover:border-gray-600 max-h-min cursor-pointer hover:shadow-xl hover:-translate-y-2 duration-200 ease-out border p-3">
        <div className="aspect-square rounded-md flex items-center justify-center bg-gray-100 shadow-inner overflow-hidden">
          {imgSrc && <img
            className=" object-cover object-center w-full"
            src={ipfsToGatewayLink(imgSrc)}
            alt="nft-image"
          />}
        </div>
        <p className="font-medium  mt-4">{name}</p>
        <p className="text-gray-400 text-sm mt-1 whitespace-pre-wrap">
          {description}
        </p>
      {amount && <p className="text-gray-400 text-sm mt-1 ">Editions : {amount}</p>}
      </div>
    </Tooltip>
  );
};

export default NftCard;
