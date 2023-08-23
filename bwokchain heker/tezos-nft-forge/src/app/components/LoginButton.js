import React, { useState } from 'react';
import { getActiveAccount, clearActiveAccount } from "../tezos";
import { Text, Button } from "@chakra-ui/react";

function LoginButton(){

    const [walletConnected, setWalletConnected] = useState(false);

    const handleLogin = async () => {
        if(!walletConnected) {
            let activeAccount = await getActiveAccount();
            setWalletConnected(true);
            console.log(activeAccount);
        }else {
            await clearActiveAccount();
            setWalletConnected(false);
        }
    }

    return(
        <>
            <Button m={'2'} className="btn btn-round-hollow" onClick={handleLogin}>
                {walletConnected ? (<Text fontSize={'xl'} fontWeight={'extrabold'}>Disconnect Wallet</Text>) : (<Text fontSize={'xl'} fontWeight={'extrabold'}>Connect Wallet</Text>)}
            </Button>
        </>
    );
}

export default LoginButton;