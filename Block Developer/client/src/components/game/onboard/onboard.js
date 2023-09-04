import { useState,Fragment, useContext } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../../../store/colorcontext'
import { useWeb3React } from '@web3-react/core'
import AuthContext from '../../../store/auth-context';
import freeMode from "../../../assets/game/freeMode.jpg"
import nftMode from "../../../assets/game/nftMode.jpg"
import tokenMode from "../../../assets/game/tokenMode.jpg"

const socket = require('../../../integration/connection/socket').socket;


function CreateNewGame(props) {
  const context = useWeb3React()
  const ctx = useContext(AuthContext);
  const params = useParams();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const [didGetUserName, setDidGetUserName] = useState(false);
  const [gameId, setGameId] = useState("");
  const [mode, setMode] = useState(0);
  const [bAmount, setBAmount] = useState()
  const [nft, setNft] = useState()
  const [disabled, setDisabled] = useState(true)
  const inputName=ctx.loginData.user.username;

  function send() {
    const newGameRoomId = uuid()
    setGameId(newGameRoomId)
    socket.emit('createNewGame', newGameRoomId)
  }
  const optionArray = []
  for (const nft in ctx.nfts) {
    console.log(nft)
    const arr = (<option value={nft.name}>{nft.name}</option>)
    optionArray.push(arr)
  }

  const modeChangeHandler0 = (event) => {
    setMode(0);
  }
  const modeChangeHandler1 = (event) => {
    setMode(1);
  }
  const modeChangeHandler2 = (event) => {
    setMode(2);
  }

  const amountChangeHandler=(event)=>{
    const amnt=event.target.value;
    if(amnt<ctx.loginData.user.token&&amnt>100000){
      setBAmount(event.target.value);
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }

  const nftChangeHandler=(event)=>{
    const nftId=event.target.value;
    if(nftId>0){
      setNft(event.target.value);
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }


  return (
    <Fragment>

      {account ?
        didGetUserName ?

          <Redirect to={"/game/" + gameId+"/"+mode+"/"+account+"/"+bAmount+"/"+nft}><button className="btn btn-success" style={{ marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px" }}>Start Game</button></Redirect>

          :

          <div>
            <div className="container mt-2 gameModesContainer d-flex flex-column">
              <div className="gameModeContent text-center m-5">
                <h1 className="text-danger">Gaming Modes</h1>
                <h3 className="mt-3 text-light">Choose a Mode to Play</h3>
              </div>

              <div className="row mt-1 mb-3" >
                <div className="col-md-4 col-sm-6 " onClick={modeChangeHandler0} style={ mode!==0 ? { opacity:'0.2'} : {opacity:'1'} }>
                  <div className="card bg-black border-info text-light">
                    <img  src={freeMode}      className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Free to Play
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6" onClick={modeChangeHandler1} style={ mode!==1 ? { opacity:'0.2'} : {opacity:'1'} }>
                  <div className="card bg-black border-info text-light">
                    <img  src={tokenMode} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Token Betting
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6" onClick={modeChangeHandler2} style={ mode!==2 ? { opacity:'0.4'} : {opacity:'1'} }>
                  <div className="card bg-black border-info text-light">
                    <img  src={nftMode} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Nft Betting
                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div className="register-screen d-flex justify-content-center align-items-center my-5">
              <form className="register-screen__form">
                <h3 className="register-screen__title text-light">Create Game</h3>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    required
                    id="username"
                    placeholder="Username"
                    value={ctx.registered && ctx.loginData.user && ctx.loginData.user.username}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    required
                    id="address"
                    autoComplete="true"
                    placeholder="Wallet Address"
                    value={`${account.substring(0, 8)}..${account.substring(account.length - 10)}`}
                  />
                </div>
                {mode === 1 && <div className="form-group">
                  <label htmlFor="token">Ammount of Token To BET:</label>
                  <input
                    type="number"
                    required
                    id="token"
                    autoComplete="true"
                    onChange={amountChangeHandler}
                    placeholder={`${ctx.registered && ctx.loginData.user && ctx.loginData.user.token} Owned`}
                    value={bAmount}
                  />
                </div>}
                {mode === 2 && <div className="form-group">
                  <label for="nft">Choose a NFT to BET:</label>
                  <select id="nft" onChange={nftChangeHandler} name="nft" className="form-select border-danger bg-dark text-light" >
                    {ctx.registered && ctx.loginData.user && ctx.loginData.nfts.map((data) => (
                      <option className="text-light" value={data.assetId}>{data.name}</option>))}
                  </select>
                </div>}
                <button type="submit"
                  className="form-btn form-btn-primary my-1"
                  disabled={!account}
                  onClick={() => {
                    props.didRedirect()
                    props.setUserName(inputName)
                    setDidGetUserName(true)
                    send()
                  }}>
                  {mode === 0 ? "Play" : "Bet"}
                </button>
              </form>
            </div>
          </div>
        :
        <h1>Connect</h1>
      }
    </Fragment>
  )
}



const Onboard = (props) => {
  const color = useContext(ColorContext)

  return <CreateNewGame didRedirect={color.playerDidRedirect} setUserName={props.setUserName} />
}


export default Onboard