import React, { useState, useEffect, createContext } from 'react';
import { BeaconWallet } from "@taquito/beacon-wallet";

const AuthContext = createContext();

const wallet = new BeaconWallet({
    name: "TezoTix",
    preferredNetwork: "ghostnet",
});


export default function AuthHolder(props) {

    const [address, setAddress] = useState(null);
    const [connected, setConnected] = useState(false);


    const getAccount = async () => {
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
            return activeAccount;
        } else {
            return "";
        }
    };
    const connectWallet = async () => {
        wallet.disconnect()
        await wallet.requestPermissions({ network: { type: "ghostnet" } });

        const account = await getAccount();

        setAddress(account.address);
        setConnected(true);
    };
    const disconnectWallet = async () => {
        await wallet.clearActiveAccount();
        wallet.disconnect()
        setAddress(null)
        setConnected(false)
    };

    useEffect(() => {
        (async () => {
            // Get the active account
            const account = await getAccount();
            if (address) {
                setAddress(account.address);
                setConnected(true);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{
            address, setAddress, connectWallet, disconnectWallet, getAccount, connected, setConnected
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { wallet };
export { AuthContext };