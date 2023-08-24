import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../utils/AuthProvider';
import Button from './Button';

export default function ConnectBtn() {
    const { address, connected, connectWallet, disconnectWallet } = useContext(AuthContext);

    const onConnectWallet = async () => {
        await connectWallet();
        address && navigator.clipboard.writeText(address);
        address && toast.success(
            `${address.slice(0, 5) + "..." + address.slice(-5)} connected successfully. Address copied to clipboard`,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
        );
    };

    const onDisconnectWallet = async () => {
        await disconnectWallet();

        toast.success(`Wallet disconnected!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    return (
        <Button
            weight={"700"}
            onClick={address ? onDisconnectWallet : onConnectWallet}
        >
            {connected ? address.slice(0, 5) + "..." + address.slice(-5) : "Connect wallet"}
        </Button>
    )
}
