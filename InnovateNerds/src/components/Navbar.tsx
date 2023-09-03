import React, { useState,useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { connectWallet, getAccount } from "../utils/wallet";

export default function NavbarComponent() {
 

  const [account,setAccount]=useState("")

  useEffect(()=>{(async ()=>{

    const account=await getAccount();
    setAccount(account)
  })();
  },[])

  const onConnectWallet=async()=>{
    await connectWallet()
    const data=await getAccount()
    setAccount(data)

  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">LUCKY NFT <small> (Build with TEZOS)</small></p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          {account?
            <Button isDisabled color="warning" variant="flat">
          {account}
          </Button>:null
          }
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" onClick={()=>onConnectWallet()}>
            Connect Wallet
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}