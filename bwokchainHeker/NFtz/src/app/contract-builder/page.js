"use client";
import React, { useState, useEffect } from "react";
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
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  return (
    <>
      <Navbar />
      <Box p={"4"}>
        <FormControl id="contract">
          <Stack direction={"column"}>
            <FormLabel fontWeight={"extrabold"}>
              What features do you want?:
            </FormLabel>
            <CheckboxGroup colorScheme="green">
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems(() => {
                    checkedItems[0] = !checkedItems[0];
                    return checkedItems;
                  })
                }
                size={"lg"}
                value="mint"
              >
                Mint
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={(e) =>
                  setCheckedItems(() => {
                    checkedItems[1] = !checkedItems[1];
                    return checkedItems;
                  })
                }
                size={"lg"}
                value="transfer"
              >
                Transfer of NFTs
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[2]}
                onChange={(e) =>
                  setCheckedItems(() => {
                    checkedItems[2] = !checkedItems[2];
                    return checkedItems;
                  })
                }
                size={"lg"}
                value="update"
              >
                Change Operators of NFTs
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[3]}
                onChange={(e) =>
                  setCheckedItems(() => {
                    checkedItems[3] = !checkedItems[3];
                    return checkedItems;
                  })
                }
                size={"lg"}
                value="alltokens"
              >
                Get All minted tokens&apos; IDs
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[4]}
                onChange={(e) =>
                  setCheckedItems(() => {
                    checkedItems[4] = !checkedItems[4];
                    console.log(checkedItems)
                    return checkedItems;
                  })
                }
                size={"lg"}
                value="isoperator"
              >
                Tell whether one can operate given token ID
              </Checkbox>
            </CheckboxGroup>
            <FormHelperText>Please select the contract</FormHelperText>
          </Stack>
        </FormControl>
      </Box>
      {/* Show contract to user */}
    </>
  );
}
export default Contract;
