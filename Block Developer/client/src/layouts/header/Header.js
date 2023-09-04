import { Fragment, useState, useContext } from "react";
import "./Header.css";
import logo from "../../assets/header/logo.png";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Toast, ToastContainer } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import ConnectModal from "../../components/misc/connect/ConnectModal";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEagerConnect } from "../../library/hooks";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

const changeNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
    } catch (error) {
      console.error(error);
    }
  }
};

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return {
      title: "Metmask Not Found",
      msg: "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.",
    };
  } else if (error instanceof UnsupportedChainIdError) {
    changeNetwork();
    return {
      title: "Unsupported Network",
      msg: "You're connected to an unsupported network.",
    };
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return {
      title: "Wallet Connect Request Rejected",
      msg: "Please authorize this website to access your Ethereum account.",
    };
  } else {
    console.error(error);
    return {
      title: "Unknown Error",
      msg: "An unknown error occurred. Check the console for more details.",
    };
  }
}

function Header(props) {
  const context = useWeb3React();
  const ctx = useContext(AuthContext)
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const triedEager = useEagerConnect();
  const [modal, setModal] = useState(false);
  const closeModalHandler = (props) => {
    setModal(false);
  };
  const openModalHandler = (props) => {
    setModal(true);
  };
  console.log(ctx.registered);
  return (
    <Fragment>
      {modal && (
        <ConnectModal
          onClose={closeModalHandler}
          open={modal}
          tried={triedEager}
        />
      )}
      <Navbar sticky="top" style={{ background: "#000" }} expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo d-flex">
                <img
                  alt=""
                  src={logo}
                  width="60"
                  height="60"
                  className="d-inline-block align-center"
                />
                <p className="text-light mb-0 ms-2 mt-3">Polyess</p>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="justify-content-center align-items-center text-center"
            style={{ backgroundColor: "#d1996d" }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="justify-content-center">
              <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                  Home
                </Link>
              </Nav.Link>
              {!ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link to="/register" style={{ textDecoration: "none", color: "#fff" }}>
                  Register To Play
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/game"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Play
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/tokens"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Tokens
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/market"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Marketplace
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/history"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Games
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/leaderboard"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Leaderboard
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Profile
                </Link>
              </Nav.Link>}
              {ctx.registered && <Nav.Link className="hover-underline-animation mx-1 text-center">
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Faq
                </Link>
              </Nav.Link>}
              <button
                onClick={openModalHandler}
                className="btn text-dark ms-2"
                style={{ backgroundColor: "#e53935" }}
              >
                {account === null
                  ? "Connect"
                  : account
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`
                  : "Connect"}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && (
        <ToastContainer className="p-3" position="middle-end">
          <Toast
            show={true}
            onClose={() => {
              deactivate();
              openModalHandler();
            }}
            className="d-inline-block m-1"
            bg="danger"
            key="Danger"
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">
                {getErrorMessage(error).title}
              </strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>{getErrorMessage(error).msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Fragment>
  );
}

export default Header;
