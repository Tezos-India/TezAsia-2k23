import React, { useState, useEffect } from "react";
import "../static/css/home.css";
import Transfer from "./Transfer.js";
import {
  Heading,
  Button,
  Box,
  Image,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

import { getContractStorage, Tezos } from "../tezos";
import config from "../config";

function Home() {
  const [userData, setUserData] = useState([]);
  const key = process.env.NEXT_PUBLIC_PINATA_KEY;
  // I know it's a bad practice to store secret in frontend but let's do it for now
  const secret = process.env.NEXT_PUBLIC_PINATA_SECRET;

  const formData = new FormData();

  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    fileUri: "",
  });

  useEffect(() => {
    async function fetchStorage() {
      let storage = await getContractStorage();
      console.log(storage);
      // let devs = storage.devs.valueMap;
      let users = [];
      // devs.forEach((dev) => {
      //   users.push(dev);
      // });
      setUserData(users);
    }
    fetchStorage();
  }, []);

  const handleChange = (event) => {
    setFormInput((prevFormInput) => {
      return {
        ...prevFormInput,
        [event.target.id]: event.target.value,
      };
    });
  };

  const handleFileChange = async(event) => {
    // upload files to pinata
    console.log(event.target.files[0])
    formData.append('fileName', event.target.files[0].name);
    formData.append('file', event.target.files[0]);
    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: formData,
        headers: {
          "pinata_api_key": key,
          "pinata_secret_api_key": secret,
        },
      })
        .then((response) => response.json())
        console.log(response);
        setFormInput((prevFormInput) => {
          return {
            ...prevFormInput,
            fileUri: response.IpfsHash,
          };
        });
    } catch (error) {
      console.log(error);
    }
  };

  const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pinata_api_key": key,
        "pinata_secret_api_key": secret,
      },
      body: JSON.stringify(JSONBody),
    })
      .then(response => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data)
            // mint the NFT
            mintingToContract(`https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`)
          })
        } else {
          throw new Error('Something went wrong ...')
        }
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  const mintNFT = async() => {
    if (!formInput.name || !formInput.description|| !formInput.fileUri) return

    let metadataURI = await pinJSONToIPFS(formInput)
    console.log('Before:', metadataURI)
  }

  const mintingToContract = async (metadataURI) => {
    console.log('After:', metadataURI)
    // how do we interact with tezos contract?
    const contract = await Tezos.wallet.at(config.contractAddress);
    let bytes = "";
    for (var i = 0; i < metadataURI.length; i++) {
      bytes += metadataURI.charCodeAt(i).toString(16).slice(-4);
    }
    // TODO: pass michelson map to mint function
    const op = await contract.methods.mint(bytes).send();
    await op.confirmation();
  }

  const readmintedNFTs = async () => {
    const contract = await Tezos.wallet.at(config.contractAddress);
    const op = await contract.methods.all_tokens().send();

  return (
    <div>
      <Box maxW="2xl" margin={"auto"}>
      <Heading>Fill Information for NFTs</Heading>
      <FormControl>
        <FormLabel fontWeight={"extrabold"}>Name:</FormLabel>
        <Input id="name" onChange={(e) => handleChange(e)} type="text" />
        <FormHelperText>Please enter a name for your NFT</FormHelperText>
        <FormLabel fontWeight={"extrabold"}>Description:</FormLabel>
        <Input id="description" onChange={(e) => handleChange(e)} type="text" />
        <FormHelperText>Please enter a description for your NFT</FormHelperText>
        <FormLabel fontWeight={"extrabold"}>File:</FormLabel>
        <Input
          id="fileUri"
          onChange={(e) => handleFileChange(e)}
          type="file"
        />
        <FormHelperText>Please select a File</FormHelperText>
        {formInput?.fileUri && <Image src={formInput?.fileUri} alt={"Uploaded Image"}></Image>}
        <Button onClick={mintNFT}>Mint NFTs</Button>
      </FormControl>
      </Box>
    </div>
  );
}

export default Home;
