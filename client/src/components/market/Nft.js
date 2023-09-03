import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Nft.css";
import { Tab, Tabs } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";

function Nft(props) {
  const context = useWeb3React();
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
  const userAddr = account;
  const params = useParams();
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    const url = "https://polyess-listner.herokuapp.com/nft";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId: `${params.id}` }),
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setNftData(json);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="section about-section gray-bg" id="about">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-6">
            <div className="about-text go-to">
              <h3 className="text-info">{nftData.nft && nftData.nft.name}</h3>
              <h6 className="theme-color lead">
                Owned By - {nftData.nft && (nftData.nft.owner_name || "OnSale")}
              </h6>
              <p className="text-light">
                {nftData.nft && nftData.nft.description}
              </p>
              <div className="row about-list">
                <div className="col-md-6">
                  <div className="media">
                    <label className="text-danger">Trait</label>
                    <p className="text-light">
                      {nftData.nft && nftData.nft.attributes.trait}
                    </p>
                  </div>
                  <div className="media">
                    <label className="text-danger">Rank</label>
                    <p className="text-light">
                      {nftData.nft && nftData.nft.attributes.rank}
                    </p>
                  </div>
                  <button type="submit" className="my-4 btn btn-outline-danger">
                    Place Bid
                  </button>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <label className="text-danger">Country</label>
                    <p className="text-light">
                      {nftData.nft && nftData.nft.attributes.country}
                    </p>
                  </div>
                  <div className="media">
                    <label className="text-danger">Price</label>
                    <p className="text-light">
                      {nftData.nft && nftData.nft.price}
                    </p>
                  </div>
                  <button type="submit" className="my-4 btn btn-outline-success">
                    Claim Nft
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-avatar text-center">
              <img
                src={
                  "https://gateway.pinata.cloud/ipfs/QmPWCagNgzp5P2TigD471JMr2bzjkhsjLEQFHTR4hAqnrg/" +
                  params.id +
                  ".png"
                }
                title=""
                alt=""
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="logo my-3 mt-5">
        <h1 className="text-center" style={{ color: "#d1996d" }}>
          <b>Recent Bids</b>
        </h1>
      </div>
      <div className="farm-leaderboard container px-4">
        <div className="farm-leaderboard__head mx-auto px-auto">
          <p>Date</p>
          <p>Bidder Name</p>
          <p>Price</p>
        </div>

        <div className="farm-leaderboard__content container py-3 px-3 my-4">
          <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">
            15-09-2023
          </p>
          <p>{nftData.bid && nftData.bid.bidder_name}</p>
          <p>{nftData.bid && nftData.bid.price}</p>
        </div>
      </div>
    </section>
  );
}

export default Nft;
