import React, { Dispatch, SetStateAction } from "react";
import { FiCopy } from "react-icons/fi";
import { copyToClipboard, ipfsToGatewayLink } from "../../lib/utils";
import Modal, { ModalHeader } from "../design/Modal";
import Tooltip from "../design/Tooltip";

export type NftDetailsModalProps = {
  isOpen: boolean;
  tokenData: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NftDetailsModal = ({
  isOpen,
  setIsOpen,
  tokenData,
}: NftDetailsModalProps) => {
  console.log(tokenData);
  const { balance, token } = tokenData;
  const { metadata } = token;
  return (
    <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg flex items-center justify-center bg-slate-200 shadow-inner overflow-hidden max-w-sm aspect-square ">
          <img
            src={ipfsToGatewayLink(metadata?.thumbnailUri)}
            alt="image"
            className="object-center object-contain w-full"
          />
        </div>
        <div>
          <h6 className="text-xl font-semibold">{metadata?.name}</h6>
          <p className="mt-2 whitespace-pre-wrap">{metadata?.description}</p>
          <div className="mt-4">
            <p className="font-bold text-gray-500 uppercase text-sm">
              Creators
            </p>
            {metadata?.creators.map((item: string, index: number) => (
              <Tooltip key={index} content="Click to copy address" >
                <button
                  onClick={() => copyToClipboard(item)}
                  className="flex items-center gap-1"
                >
                  {item.slice(0, 6) + "..." + item.slice(-4, -1)}
                  <FiCopy />
                </button>
              </Tooltip>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 uppercase text-sm">
              File Type
            </p>
            {metadata?.formats[0].mimeType}
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 uppercase text-sm">
              Asset Link
            </p>
            <Tooltip content="Click to copy link">
              <button
                className="flex items-center gap-1"
                onClick={() => copyToClipboard(metadata?.artifactUri)}
              >
                {metadata?.artifactUri.slice(0, 12) +
                  "..." +
                  metadata?.artifactUri.slice(-10, -1)}
                <FiCopy />
              </button>
            </Tooltip>
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 uppercase text-sm">
              Contract
            </p>
            <Tooltip content="Click to copy address">
              <button
                className="flex items-center gap-1"
                onClick={() => copyToClipboard(tokenData?.contract?.address)}
              >
                {token?.contract?.address.slice(0, 6) +
                  "..." +
                  token?.contract?.address.slice(-4, -1)}
                <FiCopy />
              </button>
            </Tooltip>
          </div>
          <div className="mt-4">
            <p className="font-bold text-gray-500 uppercase text-sm">
              Tokens Owned
            </p>
            {balance}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NftDetailsModal;
