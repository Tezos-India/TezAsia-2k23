import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoo.png";
import {
  connectWallet,
  getAccount,
  disconnectWallet,
} from "../../utils/wallet";
import { fetchStorage } from "../../utils/operation";
import { useNavigate } from "react-router-dom";
import { address } from "../../utils/contractAdd";
import StickyMenu from "../lib/StickyMenu";
function Drawer({ drawer, action, lang }) {
  const [itemSize, setSize] = useState("0px");
  const [item, setItem] = useState("home");
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

  const handler = (e, value) => {
    const getItems = document.querySelectorAll(`#${value} li`).length;
    if (getItems > 0) {
      setSize(`${43 * getItems}px`);
      setItem(value);
    }
  };
  return (
    <>
      <>
        <div
          onClick={(e) => action(e)}
          className={`off_canvars_overlay ${drawer ? "active" : ""}`}
        ></div>
        <div className="offcanvas_menu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div
                  className={`offcanvas_menu_wrapper ${drawer ? "active" : ""}`}
                >
                  <div className="canvas_close">
                    <a href="#" onClick={(e) => action(e)}>
                      <i className="fa fa-times"></i>
                    </a>
                  </div>
                  <div className="offcanvas-brand text-center mb-40">
                    <img src={logo} alt="" />
                  </div>
                  <div id="menu" className="text-left ">
                    <ul className="offcanvas_main_menu">
                      <li
                        onClick={(e) => handler(e, "service")}
                        id="service"
                        className="menu-item-has-children active"
                      >
                        <a href="/">Home</a>
                      </li>
                      <li
                        onClick={(e) => handler(e, "service")}
                        id="service"
                        className="menu-item-has-children active"
                      >
                        <a href="/voting">Voting</a>
                      </li>
                      <li
                        onClick={(e) => handler(e, "service")}
                        id="service"
                        className="menu-item-has-children active"
                      >
                        <a href="/results">Results</a>
                      </li>
                      {account ? (
                        <li>
                          <a
                            className="item-2"
                            href="#"
                            onClick={() => disWll()}
                          >
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
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Drawer;
