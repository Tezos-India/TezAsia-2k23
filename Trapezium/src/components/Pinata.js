import { create } from 'ipfs-http-client';
import { PinataClient } from '@pinata/sdk';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

const pinata = new PinataClient({
  apiKey: '5def83e0b51465bbedbe',
  apiSecret: 'c77cb0b32c138b2b1af8de06fae74d64a48d006305fec85f36210d0a6f189a06'
});

export const pinJSONToIPFS = async (jsonData) => {
  const stringifiedData = JSON.stringify(jsonData);
  const pinataOptions = {
    pinataMetadata: {
      name: 'NFT Metadata'
    },
    pinataOptions: {
      cidVersion: 0
    }
  };
  const pinned = await pinata.pinJSONToIPFS(stringifiedData, pinataOptions);
  return pinned.IpfsHash;
};

export const pinFileToIPFS = async (file) => {
  const added = await ipfs.add(file);
  return added.cid.toString();
};
