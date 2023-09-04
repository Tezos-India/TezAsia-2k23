import React, { Fragment,useContext } from "react";
import { useWeb3React} from '@web3-react/core'
import freeplay from "../../assets/homePage/freeplay.png";
import token from "../../assets/homePage/token.png";
import nftStaking from "../../assets/homePage/nftStaking.png";
import bet from "../../assets/homePage/bet.jpg"
import nft from "../../assets/homePage/nft.jpeg"
import AuthContext from '../../store/auth-context';
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"

import "./Home.css";

function Home(props) {
  const ctx = useContext(AuthContext);
  const context = useWeb3React()
  const {  account, error,active } = context

  return (
    <Fragment>
      {ctx.loading&active&ctx.registered&&<LoadingSpinner/>}
    {/* Home Section  */}

      <div className="home my-4">
        <div className="container homeContainer">
          <div className="d-flex homeContent">
            <div className="homeContentHeading">
              <h2>
                <span>Got Chess? Got Blockchain?</span>
              </h2>
              <h4 className="text-light mt-3">
                Here comes Polyess{" "}
              </h4>
            </div>
            <div className="homeContentButton">
              <button className={"transAll"}>
                <Link to="/game" style={{color: "#000", textDecoration: "none"}}><i className="fas fa-arrow-circle-right"></i> Play Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

    {/* Modes Section  */}

      <div className="container-fluid modesContainer d-flex flex-column mb-4">
        <div className="modesContentHeading text-center mt-4 mb-4">
          <h1 style={{color: "#d1996d"}}>Different Game Modes to Play</h1>
          <h5 className="text-light ">Play now an interactive and fun P2P chess  on your browser with your friends, while collecting NFTs that you give rewards backed by crypto-assets returns won from your progress in the Hess universe!</h5>
        </div>
        <div className="row justify-content-center">
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-2">
              <div className="item font">
                <img src={freeplay} alt="" />
              </div>
              <div className="item back p-3">
                <h6 className="text-info">
                  Enjoy a simple game of chess with your friend. Just add a
                  username or a wallet address and play with your friends3
                  anywhere in the world with a connection of internet.
                </h6>
              </div>
            </div>
          </div>
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-3">
              <div className="item font">
                <img src={token} alt="" />
              </div>
              <div className="item back p-3">
                <h6 className="text-info">
                  Use Native Hess tokens and bet with your friends on who wins
                  the classic game of Chess betting an equal amount of tokens and reflect your 
                  hard tested strategies on the game Leaderboard.
                </h6>
              </div>
            </div>
          </div>
          <div className="scene col-md-4 modesColumns transAll">
            <div className="items items-2">
              <div className="item font">
                <img src={nftStaking} alt="" />
              </div>
              <div className="item back p-3">
                <h6 className="text-info">
                  Give the king avatar of your NFT and have a real experience of
                  betting your assets while playing the classic game with your
                  friend and have a chance winning your friends NFT.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Nft Section  */}

      <div className="container-fluid nftContainer">
        <div className="nftContent">
          <div className="row">
            <div className="col nftColumns nftContentImg d-flex justify-content-center">
              <img className="transAll" src={nft} style={{textAlign: "center"}} alt="" />
            </div>
            <div className="col-md-6 nftColumns nftContentHeading d-flex flex-column justify-content-center px-4">
              <h1 style={{color: "#d1996d"}}>Nft Marketplace</h1>
              <p className="text-light ">Buy NFTs using Hess tokens which you won from your friends or bought with ethers. These NFTs feature the best chess players in India and the world and are all handmade with great details. And it is a pride to have them.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stake Section  */}

      <div className="container-fluid stakeContainer">
        <div className="stakeContent">
          <div className="row">
            <div className="col-md-6 stakeColumns stakeContentHeading">
              <h1 style={{color: "#d1996d"}}>Bet on your Skills</h1>
              <p className="text-light ">Play with your friends while betting on your assets and get a chance to buy nfts of most popular players worldwide. Wanna cash-out you can do that anytime you want with an ingame store for real Ethers.</p>
            </div>
            <div className="col stakeColumns stakeContentImg d-flex justify-content-center">
            <img className="transAll" src={bet} style={{textAlign: "center"}} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
