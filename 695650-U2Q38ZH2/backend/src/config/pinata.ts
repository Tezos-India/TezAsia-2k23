import axios from "axios";
import FormData from "form-data";

const jsonToPinata = async (json) => {
  console.log("inside JSON to pinata");
  try {
    const data = JSON.stringify(json);

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: "204edcbb77b8c53d1c78",
        pinata_secret_api_key:
          "75b603317f5a7f5d8410f9159b4b7d808f6981c87187137d5c311c0a389c368a",
      },
      data: data,
    };

    const res = await axios(config);
    return {
      sucess: true,
      Ipfs: res.data.IpfsHash,
    };
  } catch (error) {
    console.log(error);
    return {
      sucess: false,
      Ipfs: "",
    };
  }
};

export const pinataWrapper = async (name, type, image) => {
  try {
    var data = {
      name: "Blocks NFT",
      description: "This NFT is given to the players of BLOCKS",
      artifactUri: image,
      displayUri: image,
      thumbnailUri: image,
      decimals: 0,

      attributes: [
        {
          name: "Owner Name",
          value: name,
        },
        {
          name: "type Name",
          value: type,
        },
      ],

      creators: ["tz1gztg7ExVoksuZE5fyaZ65cmukj1WjpYBP"],
      isBooleanAmount: false,
      symbol: "BLOCKS",
      rights: "All right reserved.",
      shouldPreferSymbol: true,
    };

    const res = await jsonToPinata(data);

    return {
      sucess: true,
      Ipfs: res.Ipfs,
    };
  } catch (error) {
    console.log(error);
    return {
      sucess: false,
      Ipfs: "",
    };
  }
};
