import React, { useEffect, useState } from "react";
import { connectWallet, getAccount, disconnectWallet } from "../utils/wallet";
import axios from "axios";
import {FaHome, FaUser, FaSignOutAlt} from 'react-icons/fa'
import { Box, Flex, Icon, Text, tokenToCSSVar, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../utils/useSessionStorage";
import { Link } from "react-router-dom";

const getResponse = async () => {

  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/api',
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: false  
  };

  axios.request(config as any)
      .then((response) => {
          console.log("worked and this is the response");
          console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
          console.log(error);
      });
};


const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string>("");

  const [login, setLogin] = useSessionStorage("login", "");
  const [token, setToken] = useSessionStorage("token", "");
  const [user, setUser] = useSessionStorage(
    "user",
    JSON.stringify({})
  );

  let User={};

  if(login==="true"){
    User=JSON.parse(user)
  }

  const navigate = useNavigate();
  const menuItems = [
    { icon: FaUser, label: 'Profile', link:'/doctor_profile'},
    { icon: FaUser, label: 'All Patients',link:'/doctor_home' },
    { icon: FaUser, label: 'Search Patient',link:'/doctor_adddiag' },
  ];

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    // TODO 5.b - Get the active account
    const account = await getAccount();
    setAccount(account);

  };

  const disconnect = async () => {
    await disconnectWallet();
    setAccount("");
  };

  interface NavbarItem {
    icon: React.FC,
    label:string
  }

  const NavbarItem = ({ icon, label }:NavbarItem) => {

    return (
      <Flex align="center" p={2} cursor="pointer" 
      style={{color:'white',transition:"0.5s all ease",justifyContent:'center',alignItems:'center',display:'flex',fontSize:'1rem'}}
      _hover={{backgroundColor:'gray.600',color:'lightgreen',borderRadius:'10px'}}
      >
        <Icon as={icon} mr={2} color={'lightgreen'} />
       <Text style={{position:'relative',top:'.5rem',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',fontSize:'1rem',color:'white',transition:"0.5s all ease"}}
        >{label}</Text>
      </Flex>
    );
  };

  return (
    <Box bg="gray.200" boxShadow="md" >
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" style={{textDecoration:'none', color:'white',fontSize:'1.5rem'}}>
          Health Record Management
        </a>
      {(login==="true" && token.length)? <VStack spacing={1} align="stretch" flex={1} flexDirection='row' ml={'2rem'}>
        {/* {User?.speciality!==undefined && menuItems.map((item, index) => (
          <NavbarItem key={index} icon={item.icon} label={item.label} />
        ))} */}
        <Flex align="center" p={2} cursor="pointer" 
      style={{color:'white',transition:"0.5s all ease",justifyContent:'center',alignItems:'center',display:'flex',fontSize:'1rem'}}
      _hover={{backgroundColor:'gray.600',color:'lightgreen',borderRadius:'10px'}}
      onClick={()=>{
        setLogin("false");
        setToken("");
        setUser({});
        navigate('/doctor_login')
      }}
      >
        {(User as any).speciality!==undefined && <><Icon as={FaSignOutAlt} mr={2} color={'lightgreen'} />
       <Text style={{position:'relative',top:'.5rem',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',fontSize:'1rem',color:'white',transition:"0.5s all ease"}}
        >Logout</Text></>}
      </Flex>
      </VStack>:""}
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button  onClick={onConnectWallet}className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account ? <div>{account}</div> : <span>Connect Wallet</span>}
          </button>
          <button onClick={disconnect} className="btn btn-outline-danger">
            X
          </button>
        </div>
      </div>
    </div>
    </Box>

  );
};

export default Navbar;
