"use client";
import React, { useState, useEffect } from "react";
import "../static/css/home.css";
import dynamic from "next/dynamic";
import {
  Heading,
  Button,
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  LinkBox,
  LinkOverlay,
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
import config from "../config";
import { char2Bytes, bytes2Char } from "@taquito/utils";
// const getContractStorage = dynamic(() => import('../tezos').then((mod) => mod.getContractStorage), { ssr: false });
// const Tezos = dynamic(() => import('../tezos').then((mod) => mod.Tezos), { ssr: false });
import { getContractStorage, Tezos } from "../tezos";

function MintOnIPFS() {
  const [userData, setUserData] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(process.env.NODE_ENV==="development" ? process.env.NEXT_PUBLIC_PINATA_KEY : "");
  // I know it's a bad practice to store secret in frontend but let's do it for now
  const [secret, setSecret] = useState(process.env.NODE_ENV==="development" ? process.env.NEXT_PUBLIC_PINATA_SECRET : "");
  const [metadataBytes, setMetadataBytes] = useState("");
  const [fieldCount, setFieldCount] = useState(1);
  const [isBrowser, setIsBrowser] = useState(typeof window !== "undefined" ? true : false);
  const isEmpty = !key || !secret;

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

  // const addField = () => {
  // setFieldCount((prevFieldCount) => prevFieldCount + 1);
  // };

  // const [fields, setFields] = useState([
  //   <Field
  //     key={fieldCount}
  //     addHandle={handleChange}
  //     placeholder1={"name"}
  //     placeholder2={"Bored Apes"}
  //     addField={addField}
  //   />
  // ]);

  // useEffect(() => {
  //   function setNewFields() {
  //     if (fieldCount > fields.length) {
  //       setFields((prevFields) => {
  //         return [
  //           ...prevFields,
  //           <Field
  //             key={fieldCount}
  //             addHandle={handleChange}
  //             addField={addField}
  //           />,
  //         ];
  //       });
  //     }
  //   }
  //   setNewFields();
  // }, [fieldCount]);

  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    fileUrl: "",
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
          fileUrl: `ipfs://${response.IpfsHash}`,
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

  // We dont' need it as tezos can hold json data

  // const sendToIPFS = async () => {
  //   if (!formInput.name || !formInput.description || !formInput.fileUrl) return;

  //   let metadataURI = await pinJSONToIPFS(formInput);
  //   console.log("Before:", metadataURI);
  // };

  // We don't really want to allow users to mint NFTs to our contract
  // We want to mint NFTs to their own contract

  const mintingToContract = async (formInput) => {
    console.log('After:', formInput)
    // how do we interact with tezos contract?
    const contract = await Tezos.wallet.at(config.contractAddress);
    let bytes = "";
    for (var i = 0; i < metadataURI.length; i++) {
      bytes += metadataURI.charCodeAt(i).toString(16).slice(-4);
    }
  //   // TODO: pass michelson map to mint function
    const op = await contract.methods.mint(char2Bytes(metadataURI)).send();
    await op.confirmation();
  }

  const readmintedNFTs = async () => {
    const contract = await Tezos.wallet.at(config.contractAddress);
    const op = await contract.methods.all_tokens().send();
  };

  return (
    <div>
      <Box maxW="2xl" margin={"auto"} borderStyle={"dotted"} p={"2"} borderRadius={"2xl"} borderColor={"yellow"} borderWidth={"thick"}>
        <Heading size={"lg"}>Create JSON Metadata for NFTs</Heading>
        <Box h={"2xs"}>
          {isBrowser ? <ReactJson
            theme="apathy:inverted"
            src={formInput}
            onEdit={(edit) => {
              setFormInput(edit.updated_src);
              return edit.updated_src;
            }}
            onDelete={(edit) => {
              setFormInput(edit.updated_src);
              return edit.updated_src;
            }}
            onAdd={(edit) => {
              setFormInput(edit.updated_src);
              return edit.updated_src;
            }}
            enableClipboard={false}
          /> : null}
          <p>
            Shortcut: Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>enter</kbd> to
            save the value in input.
          </p><br/>
          <p><code>fileUrl</code> can be entered manually if you already have a url otherwise you can put the file on IPFS using option given below.</p>
        </Box>
      </Box>
      <Flex p={"10"}>
        <FormControl maxW={"lg"}>
          {/* {fields} */}
          <FormLabel fontWeight={"extrabold"}>Upload File for NFT:</FormLabel>
          <Input
            variant={"none"}
            id="fileUrl"
            onChange={(e) => handleFileChange(e)}
            type="file"
          />
          <FormHelperText>Please select a File</FormHelperText>
          {formInput?.fileUrl && (
            <Image src={`https://gateway.pinata.cloud/ipfs/${formInput?.fileUrl?.split('://')[1]}`} alt={"Uploaded Image"}></Image>
          )}
          <FormLabel fontWeight={"extrabold"}>Contract Address:</FormLabel>
            <Input
              id="contractAddress"
              onChange={(e) => handleContractAddressChange(e)}
              placeholder="KT1NVRsg8nDaLz5BigV21MDwkiyRBkZR69Ga"
              type="text"
            />
            <FormHelperText fontWeight={"thin"}>
              Please enter your deployed contract address. Don&apos;t have one? Go
              HERE
            </FormHelperText>
          <Button onClick={mintingToContract}>Mint Your NFT</Button>
        </FormControl>
        <Spacer />
        <Box maxW="xl">
          <Heading size={"lg"}>
            Put your Pinata keys if you want to put File on IPFS
          </Heading>
            <FormControl isInvalid={isEmpty} maxW={"lg"}>
            <FormLabel fontWeight={"extrabold"}>Api Key:</FormLabel>
            <Input
              id="pinata_key"
              placeholder={"Pinata Key"}
              onChange={(e)=> setKey(e.target.value)}
              type="text"
            />
            <FormLabel fontWeight={"extrabold"}>Secret:</FormLabel>
            <InputGroup>
            <Input
              type={show? "text" : "password"}
              placeholder={"Pinata Secret"}
              onChange={(e)=> setSecret(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(prevShow => !prevShow)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            </InputGroup>
            <FormHelperText>{' '} <Link color={"blue.200"} href="https://app.pinata.cloud">Get it from here</Link></FormHelperText>
            </FormControl>
        </Box>
      </Flex>
      <TableContainer size="xl">
        <Table variant={"striped"}>
          <TableCaption>Information for minting NFTs on explorers</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Key (Strings)</Th>
              <Th>Value (Bytes)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/*  */}
            {Object.keys(formInput).map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item}</Td>
                  <Td>{char2Bytes(formInput[item])}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MintOnIPFS;
