import React, { useState, useEffect } from "react";
import hero from "../../assets/images/newHero.png";
import shapeOne from "../../assets/images/shape/1.png";
import shapeTwo from "../../assets/images/shape/2.png";
import shapeThree from "../../assets/images/shape/3.png";
import shapeFour from "../../assets/images/shape/4.png";
import StickyMenu from "../lib/StickyMenu";
import {
  connectWallet,
  getAccount,
  disconnectWallet,
} from "../../utils/wallet";
import { fetchStorage } from "../../utils/operation";
import { useNavigate } from "react-router-dom";
import { address } from "../../utils/contractAdd";
function HeroHome() {
  const [account, setAccount] = useState("");
  const [storage, setStorage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getStorage();
  }, [account]);

  const getStorage = async () => {
    const storage = await fetchStorage(address);
    setStorage(storage);
    console.log(storage);
    getAccount().then((account) => {
      setAccount(account);
      console.log(account);
      console.log(storage.admin);
      if (storage.admin === account) {
        navigate("/admin");
      } else if (account === null) {
        navigate("/");
      } else {
        navigate("/registration");
      }
    });
    StickyMenu();
  };

  const conncetWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
    console.log(account);
  };

  const disWll = () => {
    disconnectWallet();
    navigate("/");
  };
  return (
    <>
      <section className="appie-hero-area appie-hero-8-area">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="appie-hero-content appie-hero-content-8">
                <h1 className="appie-title">
                  The Future of Voting: Secure, Decentralized, and Transparent
                </h1>
                <p>
                  we are a change agent in the world of voting. We are a
                  decentralized, transparent, and secure voting platform that
                  allows you to vote on any topic, anywhere, anytime.
                </p>
                <ul>
                  {/* <li>
                    <a href="#">
                      <i className="fab fa-google-play" />
                      <span>Google Play</span>
                    </a>
                  </li>
                  <li>
                    <a className="item-2" href="#">
                      <i className="fab fa-apple" /> <span>App Store</span>
                    </a>
                  </li> */}
                  {account ? (
                    <li>
                      <a className="item-2" href="#" onClick={() => disWll()}>
                        <span>Disconnect Wallet</span>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a
                        className="item-2"
                        href="#"
                        onClick={() => conncetWallet()}
                      >
                        <span>Connect Wallet</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appie-hero-thumb-6">
                <div
                  className="thumb text-center wow animated fadeInUp"
                  style={{
                    marginTop: "-50px",
                  }}
                  data-wow-duration="1000ms"
                  data-wow-delay="600ms"
                >
                  <img src={hero} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-8-shape-1">
          <img src={shapeThree} alt="" />
        </div>
        <div className="home-8-shape-2">
          <img src={shapeFour} alt="" />
        </div>
        <div className="home-8-shape-3">
          <img src={shapeOne} alt="" />
        </div>
        <div className="home-8-shape-4">
          <img src={shapeTwo} alt="" />
        </div>
      </section>
    </>
  );
}

export default HeroHome;
