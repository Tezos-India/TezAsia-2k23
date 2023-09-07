import React from "react";
import Faq from "react-faq-component";
import "./Faqs.css";

const data = {
  rows: [
    {
      title: "What can I do around here?",
      content: `Polyhess is a Chess gameplay website where you can play with your friends. There are 3 modes, Free-to-Play, Token betting, and Nft bets. Free-to-Play as the name suggests does not include any money as sort. While betting needs HT tokens for betting purposes. You and your friend both will stake an equal amount of Hess Tokens and have a game of chess to decide who gets the stake.  NFT staking is the same as token staking but you are playing for NFTs rather than NFTs.`,
    },
    {
      title: "How do I get Hess Tokens?",
      content: `There are 2 ways to get hess tokens. One you buy the tokens in exchange of ethers or you win from your friends. Each Token costs 10^-12 Ether. And you need at least 10^8 HT tokens to start staking.`,
    },
    {
      title: "What are NFTs? I don't understand all this rocket science GenZ is talking about?",
      content: `Non-Fungible tokens of NFTs means they are unique and can’t be traded for other NFTs. Like one bitcoin can be exchanged for another bitcoin, NFTs are not like that. Their uniqueness is backed by technology like blockchain and to be honest anything digital can be NFT, picture, mp3 files, books, anything you can imagine. We created NFTs of famous chess players, if you like art, buy it at the marketplace.`,
    },
    {
      title: "Okay! I get it but does these NFTs have any utility?",
      content: `Yes we got you covered in that. You will be able to play with your friends and bet your NFTs on a game of chess but what is ingenious here is whichever NFT you are gonna stake the king of the Board will take the face on NFT, which looks super awesome does it not?.`,
    },
    {
      title: "How many NFTs are there?",
      content: `There are 25 NFTs and each costs 10^10 HT tokens or 0.01 Ethers. They can be used to play in NFT staking or can be used to trade in the marketplace.`,
    },
    {
      title: "I have Billions and Trillions of HT tokens. Does it help?",
      content: `All the traditional cloud storage are centralized and keep all the data on their server which are prone to hacks and thus making it unreliable, while our idea is completely decentralized and also hack-proof through 3 levels of the system (Blockchain, IPFS, added encryption) thus making it impossible to hack.`,
    },
    {
      title: "What about my Profile?",
      content: `Go to the profile section, Each profile has a user name and wallet ID which is connected. It provides a detail view of Tokens, NFTs, games won and games lost. And also displays what NFTs you have with game history. `,
    },
    {
      title: "I am new to blockchain. Is there any knowledge that I need to have before starting?",
      content: `You just should know how to use your Metamask Wallet as you will be playing with very much real money and also crypto is a ground for multiple scams so i would like you to be aware about that.`,
    },
    {
      title: "How does the leaderboard metrics work?",
      content: `For each win you get 2 points for each loss you get 1 point and for each draw you get 1.5 points. As we want to promote users to play chess more and more rather than their  The more you play the higher your rank is.`,
    },
    {
      title: "What to do if you get an error in HT token staking?",
      content: `First check if you and your friend are staking the right amount of tokens, then check if you both are staking more than limit? This should get the problem fixed. If not write to us at support@hesstoken.in.`,
    },
    {
      title: "Is there an App for this? If yes, what features does it include?",
      content: `Yes there is an app and it is a marketplace for ntfs and shows you your profile status with the comfort of your phone. We are working with the Google team to bring the app to the playstore so you should expect it as a feature coming soon.`,
    },
    {
      title: "How are we decentralised?",
      content: `All the transactions either be it NFTs, HT tokens or ether exchanges happen through the ethereum blockchain which is one of the most decentralised and distributed blockchain and thus we as owners does not have any control over your assets at all. `,
    },
  ],
};

const styles = {
  rowTitleTextSize: "1.1rem",
  rowTitleColor: "blue",
  rowContentColor: "white",
  rowContentTextSize: "1.2rem",
  arrowColor: "#05ffa1",
};

const config = {
  animate: true,
  arrowIcon: "V",
  tabFocus: true,
};

const Faqs = (props) => {
  return (
    <div>
      <div className="logo my-3 text-center" >
        <h1 className="text-center" style={{color: "#d1996d"}}>
          <b>Faqs</b>
        </h1>
      </div>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default Faqs;
