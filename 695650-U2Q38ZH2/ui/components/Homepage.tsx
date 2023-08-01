import React from "react";
import { Card } from "./Card";
import { Footer } from "./Footer";

export const Homepage = () => {
  return (
    <div>
      <div className="flex">
        <div className="py-16">
          <div className=" text-6xl font-['Outfit'] font-bold text-white pl-[80px] mt-[40px]">
            The Future of Online Gaming <br />
            is Here - Win, Earn, and <br />
            own with EtherStrike.
          </div>
          <div className="text-3xl font-sans font-light text-gray-400 pl-[80px] pt-8">
            Play thrilling games, stake your Tezos, <br />
            and win big. Discover a world <br />
            where gaming pays off, literally!!
            <br />
            and experience the unique twist of winning <br />
            real Tezos rewards and minting your
            <br />
            own NFTs.
          </div>
        </div>
        <img
          src="/1.png"
          alt=""
          className="absolute ml-[600px] w-[800px] h-[600px]"
        />
      </div>
      <hr className="border-t border-white h-2 my-2"></hr>
      <div className="pb-16">
        <div className="flex p-[80px] justify-evenly ">
          <Card tittle=" Play to Earn" description="Stake tezoz and win" />
          <Card
            tittle=" Tezoz Blockchain"
            description=" Our games powered by tezoz ( transparency, fairness,security )"
          />
          <Card tittle="  NFT Integration" description="Unlock awesome NFt’s" />
          <Card tittle=" Users" description=" Millions of Users and beyond" />
        </div>
        <div className="flex justify-center ">
          <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] ">
            Explore More!
          </button>
        </div>
      </div>
      <hr className="border-t border-white h-2 my-2"></hr>
      <div className="flex ml-[100px] pb-10">
        <div className="pl-160">
          <div className=" text-6xl font-['Outfit'] font-bold text-white pl-[80px] mt-[40px]">
            ChessUnleashed
          </div>
          <div className="text-2xl font-sans font-light text-gray-400 pl-[80px] pt-8">
            Embrace the thrill of traditional chess <br/> with a modern twist as we
            tie unique  <br/> NFTs to every chess piece, adding a  <br/> captivating new
            dimension to your<br/> gameplay.
          </div>
          <div className="pl-[90px] pt-8">
          <button className="text-white text-3xl bg-blue-500 rounded-full h-12 px-8 font-['Roboto'] ">
            Play Now
          </button>
          </div>
        </div>
        <div>
          <img src="/2.png" alt=""  className="w-[462px] h-[437px] ml-[200px]"/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
