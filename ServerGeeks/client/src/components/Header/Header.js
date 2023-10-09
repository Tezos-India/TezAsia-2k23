import React, { useEffect, useState } from "react"
import {BiWallet} from 'react-icons/bi'
import {MdOutlineLeaderboard} from 'react-icons/md'
import {connectWallet, disconnectWallet, getAccount} from "../../utils/wallet";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { adminWlt } from "../../utils/constants"
import {
  Group,
  Button,
} from "@mantine/core";
import gamifyLogo from "../../assets/gamifyLogo.png";


function Header() {
    const navigate = useNavigate();
    const [account, setAccount] = useState("");
    useEffect(() => {
      (async () => {
          const account = await getAccount();
          setAccount(account);        
          console.log(account)
      })();
    }, []);
  
    const onClickConnect = async () => {
      await connectWallet();
      const account = await getAccount();
      setAccount(account);
    }

    const onClickDisconnect = async() => {
      await disconnectWallet();
      const account = await getAccount();
      setAccount(account);
    }

    const query = useMediaQuery("(max-width: 719px)");


    return(
        <Group position="apart" className="header">
            {/* <Title
                weight={700}
                size="lg"
                sx={(theme) => ({
                    color: '#ffffff',
                })}
            >
            Gamify
          </Title> */}
          <img className="pointer" src={gamifyLogo} alt="Uno Game Logo" height={50} width={150} onClick={() => navigate("/", { replace: true })} />
          <Group position="right">
            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/uno", { replace: true })}
                  color="dark" 
                  radius="md"
              >
              Uno
            </Button>
{/* 
            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/chess", { replace: true })}
                  color="dark" 
                  radius="md"
              >
              Chess
            </Button> */}

            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/leaderboard", { replace: true })}
                  color="dark" 
                  radius="md"
              >
                <span className="wallet-icon"><MdOutlineLeaderboard /></span>
              Leaderboard
            </Button>
            {account === adminWlt && (
              <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/weeklyForm", { replace: true })}
                  color="dark" 
                  radius="md"
              >
                Create Weekly
              </Button>
            )}
            {account === "" ? (
              <Button
                color="dark"
                size="lg"
                radius="md"
                onClick={() => onClickConnect()}
                className="flex justify-between gap-x-3"
              >
                <span className="wallet-icon"> <BiWallet /></span>
                Connect Wallet
              </Button> ) : (
                <Button
                  color="dark"
                  size="lg"
                  radius="md"
                  onClick={() => onClickDisconnect()}
                >
                  {account.slice(0,6) + "..."}
                </Button>
            )
            }
          </Group>
        </Group>
    );
}

export default Header;