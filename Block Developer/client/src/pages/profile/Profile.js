import { Fragment, useState, useEffect, useContext } from 'react';
 import './Profile.css';
 import axios from 'axios';
 import {useParams} from 'react-router-dom';
 import { useWeb3React} from '@web3-react/core';
 import ControlledTabs from '../../components/profile/ControlledTabs';
 import AuthContext from '../../store/auth-context';
 import LoadingSpinner from '../../components/misc/LoadingSpinner/LoadingSpinner';

function Profile(props) {
    const context = useWeb3React()
    const ctx = useContext(AuthContext);
    console.log(ctx.registered)
    return (
        <Fragment>
        {ctx.loading&&<LoadingSpinner/>}
        <section className="section about-section" id="about">
            <div className="container p-4 my-4 profile">
                <div className="row align-items-center flex-row-reverse justify-content-center text-center">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="text-light">{ctx.registered && ctx.loginData.user && ctx.loginData.user.username}</h3>
                            <h6 className="theme-color lead">{ctx.loginData.user && `${ctx.loginData.user.address.substring(0, 6)}...${ctx.loginData.user.address.substring(ctx.loginData.user.address.length-4)}`}</h6>
                        </div>
                    </div>
                </div>
                <div className="counter my-4">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2 text-success" data-to="500" data-speed="500">{ctx.loginData.user && ctx.loginData.user.token}</h6>
                                <p className="m-0px font-w-600 text-light">Tokens Count</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2 text-success" data-to="150" data-speed="150">{ctx.loginData.nfts && ctx.loginData.nfts.length}</h6>
                                <p className="m-0px font-w-600 text-light">NFT Count</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2 text-success" data-to="850" data-speed="850">{ctx.loginData.win && ctx.loginData.win.length}</h6>
                                <p className="m-0px font-w-600 text-light">Games Won</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2 text-success" data-to="190" data-speed="190">{ctx.loginData.loose && ctx.loginData.loose.length}</h6>
                                <p className="m-0px font-w-600 text-light">Games Lost</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="m-0"/>
<ControlledTabs arrayWin={ctx.loginData.win && ctx.loginData.win} arrayNft={ctx.loginData.nfts && ctx.loginData.nfts} arrayLost={ctx.loginData.loose && ctx.loginData.loose}/>
        </section>
        </Fragment>
    )
}



export default Profile

