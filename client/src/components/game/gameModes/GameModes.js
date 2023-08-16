import React from "react";
import {Link} from 'react-router-dom'
import freeMode from "../../../assets/game/freeMode.jpg"
import nftMode from "../../../assets/game/nftMode.jpg"
import tokenMode from "../../../assets/game/tokenMode.jpg"

import "./GameModes.css"

function GameModes() {
  return (
    <div className="container mt-2 gameModesContainer d-flex flex-column">
        <div className="gameModeContent text-center m-5">
            <h1 className="text-danger">Gaming Modes</h1>
            <h3 className="mt-3 text-light">Choose a Mode to Play</h3>
        </div>

        <div className="row mt-1 mb-3">
          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
              <Link to='/game/0'><img src={freeMode} className="card-img-top" alt="..." /></Link>
              <div className="card-body">
                <p className="card-text text-center">
                    Free to Play
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
            <Link to='/game/1'><img src={tokenMode} className="card-img-top" alt="..." /></Link>
              <div className="card-body">
                <p className="card-text text-center">
                    Token Betting
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card bg-black border-info text-light">
            <Link to='/game/2'><img src={nftMode} className="card-img-top" alt="..." /></Link>
              <div className="card-body">
                <p className="card-text text-center">
                    Nft Betting
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
  );
}

export default GameModes;
