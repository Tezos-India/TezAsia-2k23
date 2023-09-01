import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoo.png";
import StickyMenu from "../lib/StickyMenu";
import Navigation from "../Navigation";
import {
  connectWallet,
  getAccount,
  disconnectWallet,
} from "../../utils/wallet";
import {address} from "../../utils/contractAdd";
import { fetchStorage } from "../../utils/operation";
import { useNavigate } from "react-router-dom";

function AdminHeader({ action }) {
  const [account, setAccount] = useState("");
  const [storage, setStorage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    StickyMenu();
    getAccount().then((account) => {
      setAccount(account);
    });
    getStorage();
  }, [account]);

  const getStorage = async () => {
    const storage = await fetchStorage(address);
    setStorage(storage);
  };

  return (
    <>
      <header className="appie-header-area appie-header-8-area appie-sticky">
        <div className="container">
          <div className="header-nav-box header-nav-box-6">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                <div className="appie-logo-box">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                <div className="appie-header-main-menu">
                  <Navigation />
                </div>
              </div>
              
              <div className="col-lg-4 col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                <div className="appie-btn-box text-right">
                  <a
                    className="main-btn ml-30"
                    onClick={() => {
                      disconnectWallet();
                      navigate("/");
                    }}
                    style={{
                      color: "white",
                    }}
                  >
                    {account ? "Disconnect" : "Connect"}
                  </a>

                  <div
                    onClick={(e) => action(e)}
                    className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                  >
                    <i className="fa fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
