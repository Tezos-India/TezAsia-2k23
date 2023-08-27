"use client";
import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  CheckboxGroup,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function Contract() {
  return (
    <>
    <Navbar/>
      <Box p={"4"}>
        <FormControl id="contract">
          <Stack direction={"column"}>
            <FormLabel fontWeight={"extrabold"}>
              What features do you want?:
            </FormLabel>
            <CheckboxGroup colorScheme="green">
              <Checkbox size={"lg"} value="mint">
                Mint
              </Checkbox>
              <Checkbox size={"lg"} value="transfer">
                Transfer of NFTs
              </Checkbox>
              <Checkbox size={"lg"} value="update">
                Change Operators of NFTs
              </Checkbox>
              <Checkbox size={"lg"} value="alltokens">
                Get All minted tokens&apos; IDs
              </Checkbox>
              <Checkbox size={"lg"} value="isoperator">
                Tell whether one can operate given token ID
              </Checkbox>
            </CheckboxGroup>
            <FormHelperText>Please select the contract</FormHelperText>
          </Stack>
        </FormControl>
      </Box>
    </>
  );
}
export default Contract;
