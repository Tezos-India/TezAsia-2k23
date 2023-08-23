import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../utils/AuthProvider";

import Logo from "../assets/Logo.svg";
import LogoGlow from "../assets/LogoGlow.svg";
import LogoText from "../assets/LogoText.svg";
import Search from "../assets/Search.svg";

import Button from "./Button"

export default function Header() {

    const { address, connectWallet, disconnectWallet } = useContext(AuthContext);

    const [minifiedAddress, setMinifiedAddress] = useState("...");

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

        setMinifiedAddress("...");
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

    useEffect(() => {
        if (address) {
            console.log(address)
            setMinifiedAddress(address.slice(0, 5) + "..." + address.slice(-5));
        }
    }, [address]);

    return (
        <div className="flex flex-row justify-between items-center px-[50px] py-[10px] w-screen mb-[90px]">
            <NavLink to="/">
                <div className="flex flex-row items-end justify-center p-0 gap-[12px]">
                    <div className="relative flex items-center justify-center">
                        <img draggable={false} src={Logo} height="35px" alt="TezoTix" />
                        <img draggable={false} src={LogoGlow} className="absolute h-[120px] w-[120px] max-w-[120px]" alt="TezoTix" />
                    </div>
                    <img draggable={false} src={LogoText} alt="TezoTix" />
                </div>
            </NavLink>


            <div className="flex flex-row items-center p-0 gap-[50px]">
                <div className="flex flex-row items-center p-0 gap-[10px]">
                    <NavLink to="/" className="font-primaryFont Poppins px-[7px] py-[3px] rounded transition hover:bg-white/10 text-base font-extralight text-white" style={({ isActive }) => {
                        return { backgroundColor: isActive && "rgba(255, 255, 255, 0.1)" }
                    }}>Home</NavLink>
                    <NavLink to="/account" className="font-primaryFont Poppins px-[7px] py-[3px] rounded transition hover:bg-white/10 text-base font-extralight text-white" style={({ isActive }) => {
                        return { backgroundColor: isActive && "rgba(255, 255, 255, 0.1)" }
                    }}>My tickets</NavLink>
                    <NavLink to="/admin" className="font-primaryFont Poppins px-[7px] py-[3px] rounded transition hover:bg-white/10 text-base font-extralight text-white" style={({ isActive }) => {
                        return { backgroundColor: isActive && "rgba(255, 255, 255, 0.1)" }
                    }}>Admin</NavLink>
                </div>

                <NavLink to="/search"><img src={Search} height="20px" width="20px" alt="Search" /></NavLink>

            </div>

            <Button
                weight={"700"}
                onClick={address ? onDisconnectWallet : onConnectWallet}
            >
                {address ? minifiedAddress : "Connect wallet"}
            </Button>

        </div>
    )
}