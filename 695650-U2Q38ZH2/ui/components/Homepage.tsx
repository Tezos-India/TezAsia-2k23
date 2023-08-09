import React from "react";
import { Card } from "./Card";
import { Footer } from "./Footer";
import Image from "next/image";

export const Homepage = () => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center px-[80px] mt-[40px] mb-8">
        <div>
          <h1 className="text-6xl font-['Outfit'] font-bold text-white">
            The Future of Online Gaming <br />
            is Here - Win, Earn, and <br />
            own with EtherStrike.
          </h1>
          <p className="text-3xl font-sans font-light text-gray-400 pt-8">
            Play thrilling games, stake your Tezos, <br />
            and win big. Discover a world <br />
            where gaming pays off, literally!!
            <br />
            and experience the unique twist of winning <br />
            real Tezos rewards and minting your
            <br />
            own NFTs.
          </p>
        </div>
        <div>
          <Image src="/1.png" alt="Gaming Image" width={800} height={600} />
        </div>
      </div>
      <hr className="border-t border-white h-2 my-2"></hr>
      <div className="pb-16 px-[80px]">
        <div className="flex justify-evenly my-8">
          <Card title="Play to Earn" description="Stake Tezos and win" />
          <Card title="Tezos Blockchain" description="Our games powered by Tezos (transparency, fairness, security)" />
          <Card title="NFT Integration" description="Unlock awesome NFT’s" />
          <Card title="Users" description="Millions of Users and beyond" />
        </div>
        <div className="flex justify-center">
          <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto']">
            Explore More!
          </button>
        </div>
      </div>
      <hr className="border-t border-white h-2 my-2"></hr>
      <div className="flex justify-between items-center px-[80px] mb-8">
        <div>
          <h2 className="text-6xl font-['Outfit'] font-bold text-white">ChessUnleashed</h2>
          <p className="text-2xl font-sans font-light text-gray-400 pt-8">
            Embrace the thrill of traditional chess <br /> with a modern twist.
            Each chess piece is tied to a unique NFT, adding a captivating new dimension to your gameplay.
          </p>
          <div className="pt-8">
            <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto']">
              Play Now
            </button>
          </div>
        </div>
        <div>
          <Image src="/2.png" alt="Chess Image" width={462} height={437} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
