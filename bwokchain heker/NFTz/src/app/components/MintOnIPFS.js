"use client";
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
  Flex,
  Spacer,
  useToast,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Field from "./Field";
import ReactJson from "react-json-view";
import { getContractStorage, Tezos } from "../tezos";
import config from "../config";
import { char2Bytes, bytes2Char } from "@taquito/utils";

function MintOnIPFS() {
  const [userData, setUserData] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const key = process.env.NEXT_PUBLIC_PINATA_KEY;
  // I know it's a bad practice to store secret in frontend but let's do it for now
  const secret = process.env.NEXT_PUBLIC_PINATA_SECRET;
  const [metadataBytes, setMetadataBytes] = useState("");
  const [fieldCount, setFieldCount] = useState(1);

  const formData = new FormData();
  const toast = useToast();

  const handleChange = (event) => {
    setFormInput((prevFormInput) => {
      if (event.target.name === "key") {
        return {
          ...prevFormInput,
          // [event.target.value]: ...,
        };
      }
    });
  };

  const addField = () => {
    setFieldCount((prevFieldCount) => prevFieldCount + 1);
  };

  const [fields, setFields] = useState([
    <Field
      key={fieldCount}
      addHandle={handleChange}
      placeholder1={"name"}
      placeholder2={"Bored Apes"}
      addField={addField}
    />,
  ]);
  useEffect(() => {
    function setNewFields() {
      if (fieldCount > fields.length) {
        setFields((prevFields) => {
          return [
            ...prevFields,
            <Field
              key={fieldCount}
              addHandle={handleChange}
              addField={addField}
            />,
          ];
        });
      }
    }
    setNewFields();
  }, [fieldCount]);

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

  const handleFileChange = async (event) => {
    // upload files to pinata
    console.log(event.target.files[0]);
    formData.append("fileName", event.target.files[0].name);
    formData.append("file", event.target.files[0]);
    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          body: formData,
          headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
          },
        }
      ).then((response) => response.json());

      toast({
        title: "Successful!",
        description: "File uploaded to IPFS",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      console.log(response);

      setFormInput((prevFormInput) => {
        return {
          ...prevFormInput,
          fileUri: response.IpfsHash,
        };
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error! More info in console.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };

  const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
      body: JSON.stringify(JSONBody),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            // metadata URI
            setMetadataBytes(char2Bytes(`ipfs://${data.IpfsHash}`));
          });
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const sendToIPFS = async () => {
    if (!formInput.name || !formInput.description || !formInput.fileUri) return;

    let metadataURI = await pinJSONToIPFS(formInput);
    console.log("Before:", metadataURI);
  };

  // We don't really want to allow users to mint NFTs to our contract
  // We want to mint NFTs to their own contract

  // const mintingToContract = async (metadataURI) => {
  //   console.log('After:', metadataURI)
  //   // how do we interact with tezos contract?
  //   const contract = await Tezos.wallet.at(config.contractAddress);
  //   let bytes = "";
  //   for (var i = 0; i < metadataURI.length; i++) {
  //     bytes += metadataURI.charCodeAt(i).toString(16).slice(-4);
  //   }
  //   // TODO: pass michelson map to mint function
  //   const op = await contract.methods.mint(char2Bytes(metadataURI)).send();
  //   await op.confirmation();
  // }

  const readmintedNFTs = async () => {
    const contract = await Tezos.wallet.at(config.contractAddress);
    const op = await contract.methods.all_tokens().send();
  };

  return (
    <div>
      {/* <Flex pl={"10"} pr={"10"}> */}
        <Box maxW="2xl" margin={"auto"}>
          <Heading size={"lg"}>Create Metadata for NFTs</Heading>
          <Box h={"xs"}>
            <ReactJson
              theme="apathy:inverted"
              src={formInput}
              onEdit={(edit) => {
                return edit.updated_src;
              }}
              onDelete={(edit) => {
                return edit.updated_src;
              }}
              onAdd={(edit) => {
                return edit.updated_src;
              }}
              enableClipboard={false}
            />
          </Box>
        </Box>
        <Flex p={"10"}>
          <FormControl maxW={"lg"}>
            {/* {fields} */}
            <FormLabel fontWeight={"extrabold"}>File:</FormLabel>
            <Input
              id="fileUri"
              onChange={(e) => handleFileChange(e)}
              type="file"
            />
            <FormHelperText>Please select a File</FormHelperText>
            {formInput?.fileUri && (
              <Image src={formInput?.fileUri} alt={"Uploaded Image"}></Image>
            )}
            <FormLabel fontWeight={"extrabold"}>Contract Address:</FormLabel>
            <Input
              id="contractAddress"
              onChange={(e) => handleContractAddressChange(e)}
              type="text"
            />
            <FormHelperText fontWeight={"thin"}>
              Please enter your deployed contract address. Don't have one? Go
              HERE
            </FormHelperText>
            <Button onClick={sendToIPFS}>Put NFTs on IPFS</Button>
          </FormControl>
          <Spacer />
          <Box maxW="xl">
            <Heading size={"lg"}>
              Put your Pinata keys if you want to put File on IPFS
            </Heading>
            <Field placeholder1={"Pinata Key"} placeholder2={"Pinata Secret"} />
          </Box>
        </Flex>
        {/* <Spacer /> */}
      {/* </Flex> */}
      <TableContainer>
        <Table variant={"striped"}>
          <TableCaption>Information for minting NFTs on explorers</TableCaption>
          <Thead>
            <Tr>
              <Th>Metadata (Strings)</Th>
              <Th>IPFS hash (Bytes)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>metadata</Td>
              <Td>{metadataBytes}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MintOnIPFS;
