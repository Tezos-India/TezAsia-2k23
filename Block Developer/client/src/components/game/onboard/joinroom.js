import {Fragment,useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { useWeb3React} from '@web3-react/core';
import JoinGame from './joingame';
import ChessGame from '../chessUI/chessgame';
import AuthContext from '../../../store/auth-context';
import freeMode from "../../../assets/game/freeMode.jpg"
import nftMode from "../../../assets/game/nftMode.jpg"
import tokenMode from "../../../assets/game/tokenMode.jpg"


function JoinRoom(props) {
     const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const ctx = useContext(AuthContext);
    const params = useParams();
    const{mode,gameId,addr}=params;
    console.log(mode);
    const [nftt, setNftt] = useState();
    const [disabled, setDisabled] = useState(true);
    const [didGetUserName,setDidGetUserName]= useState(false);


    const nftChangeHandler=(event)=>{
        const nftId=event.target.value;
        if(nftId>0){
          setNftt(event.target.value);
          setDisabled(false)
        }else{
          setDisabled(true)
        }
 }
    
    return (
        <Fragment>
        {ctx.registered?
            didGetUserName ? 
            <Fragment>
                <JoinGame userName = {ctx.loginData.user.username} isCreator = {false}/>
                <ChessGame myUserName = {ctx.loginData.user.username}/>
            </Fragment>
        :
           
            <div>
            <div className="container mt-2 gameModesContainer d-flex flex-column">

            <h4 className="text-center mt-4 text-light">{`Hey ${ctx.loginData.user&&ctx.loginData.user.username}, you were invited to play`}</h4>
                       
              <div className="gameModeContent text-center m-5">
                <h1 className="text-danger">Gaming Mode</h1>
                <h3 className="mt-3 text-light">Challenge Mode Selected</h3>
              </div>

              <div className="row mt-1 mb-3" >
               {mode==="0" && <div className="col-md-4 col-sm-6 mx-auto">
                  <div className="card bg-black border-info text-light">
                    <img  src={freeMode}      className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Free to Play
                      </p>
                    </div>
                  </div>
                </div>}

                {mode==="1"&&<div className="col-md-4 col-sm-6 mx-auto">
                  <div className="card bg-black border-info text-light">
                    <img  src={tokenMode} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Token Betting
                      </p>
                    </div>
                  </div>
                </div>}

               {mode==="2"&& <div className="col-md-4 col-sm-6 mx-auto" >
                  <div className="card bg-black border-info text-light">
                    <img  src={nftMode} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <p className="card-text text-center">
                        Nft Betting
                      </p>
                    </div>
                  </div>
                </div>}


              </div>
            </div>
            <div className="register-screen d-flex justify-content-center align-items-center my-5">
              <form className="register-screen__form">
                <h3 className="register-screen__title text-light">Join Game</h3>
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
                {mode === "1" && <div className="form-group">
                  <label htmlFor="token">Ammount of Token To BET:</label>
                  <input
                    type="number"
                    required
                    id="token"
                    autoComplete="true"
                    placeholder={`${ctx.registered && ctx.loginData.user && ctx.loginData.user.token} Owned`}
                    value={params.amount}
                  />
                </div>}
                {mode === "2" && <div className="form-group">
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
                   
                    setDidGetUserName(true)
                  }}>
                  {params.mode === "0" ? "Play" : "Bet"}
                </button>
              </form>
            </div>
          </div>
            :<h1>Connect</h1>
        }
        </Fragment>
    )
}



export default JoinRoom
