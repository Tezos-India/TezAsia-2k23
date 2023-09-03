import React from "react";
import { Link } from "react-router-dom";
import HeadingUnderline from "../components/HeadingUnderline";
import Button from "../components/Button";

import home_seats_img from "../assets/home_seats_img.png"
import wallets_selection_img from "../assets/wallets_selection_img.png"
import ticket_img from "../assets/ticket_img.png"
import qr_img from "../assets/qr_img.png"

export default function Home() {
    return (
        <div className="flex flex-col gap-[120px] justify-center items-center">
            <div className="flex flex-col gap-10 justify-center items-center">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <h2 className="text-white text-7xl font-bold">Extraordinary</h2>
                    <h2 className="text-white text-7xl font-bold">
                        <span className="bg-primaryGradient text-transparent bg-clip-text">NFT Tickets </span>
                        <span>you’ll love</span>
                    </h2>
                </div>
                <p className="text-white/30 text-xl font-medium">Book movie tickets as NFTs and own your seat for the show.</p>
            </div>

            <div className="flex flex-col gap-20 items-center w-full">
                <HeadingUnderline>How it works</HeadingUnderline>

                <div className="flex flex-col gap-32 items-center w-full">
                    <div className="flex flex-row items-center gap-14 w-full max-w-[1150px] px-30">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex flex-row gap-5 items-center">
                                <p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">1</p>
                                <p className="text-white text-2xl font-bold">Select your seats</p>
                            </div>
                            <p className="text-white/30 text-lg">Select the most comfortable seat according to your budget and preferences, to enjoying the movie throught.</p>
                        </div>
                        <img src={home_seats_img} alt="" />
                    </div>
                    <div className="flex flex-row-reverse items-center gap-14 w-full max-w-[1150px] px-30">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex flex-row gap-5 items-center">
                                <p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">2</p>
                                <p className="text-white text-2xl font-bold">Pay using your crypto wallet</p>
                            </div>
                            <p className="text-white/30 text-lg">Select the most comfortable seat according to your budget and preferences, to enjoying the movie throught.</p>
                        </div>
                        <img src={wallets_selection_img} alt="" />
                    </div>
                    <div className="flex flex-row items-center gap-14 w-full max-w-[1150px] px-30">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex flex-row gap-5 items-center">
                                <p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">3</p>
                                <p className="text-white text-2xl font-bold">Get your seat minted as an NFT</p>
                            </div>
                            <p className="text-white/30 text-lg">Select the most comfortable seat according to your budget and preferences, to enjoying the movie throught.</p>
                        </div>
                        <img src={ticket_img} alt="" />
                    </div>
                    <div className="flex flex-row-reverse items-center gap-14 w-full max-w-[1150px] px-30">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex flex-row gap-5 items-center">
                                <p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">4</p>
                                <p className="text-white text-2xl font-bold">Scan the QR and verify your ticket</p>
                            </div>
                            <p className="text-white/30 text-lg">Select the most comfortable seat according to your budget and preferences, to enjoying the movie throught.</p>
                        </div>
                        <img src={qr_img} alt="" />
                    </div>
                </div>
            </div>

            <Button style="w-full max-w-[500px]"><Link to="/search">Browse Theatres/Movies</Link></Button>
        </div>
    );
}