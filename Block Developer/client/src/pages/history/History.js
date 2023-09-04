import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./History.css";
import winner from "../../assets/game/winner.png";
import loser from "../../assets/game/loser.png";
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";

export default function History() {
  const params = useParams();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const url = `http://polyess-listner.herokuapp.com/games?gameId=${params.id}`;

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url);
        const json = await response.json();
        setHistoryData(json);
        setLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
    {loading&&<LoadingSpinner/>}
      <div className="logo my-3 text-center">
        <h1 style={{color: "#d1996d"}}>
          <b>Game Analytics</b>
        </h1>
      </div>
      <div className="container" style={{ alignItems: "center" }}>
        <div className="container row myrow farm-minning__first pe-4 py-4 my-md-4">
          <div className="container col-md">
            <h1 className="m-3">Winner</h1>
            <div className="container d-flex flex-row">
              <img
                className="mx-2 p-2 border border-warning"
                src={winner}
                alt="create"
                height="50"
                style={{ borderRadius: "14px", borderWidth: "4px" }}
              />
              <p className="text-left mx-3 my-auto">
                User
                <br />
                Address
              </p>
              <p className="text-right mx-3 my-auto">
                {historyData[0] && `${historyData[0].winner_name}`}
                <br />
                {historyData[0] &&
                  `${historyData[0].winner_addr.substring(
                    0,
                    6
                  )}..${historyData[0].winner_addr.substring(
                    historyData[0].winner_addr.length - 4
                  )}`}
              </p>
            </div>
          </div>

          <div className="container col-md">
            <h1 className="m-3">Loser</h1>
            <div className="container  d-flex flex-row">
              <img
                className="mx-2 p-2 border border-warning"
                src={loser}
                alt="create"
                height="50"
                style={{ borderRadius: "14px", borderWidth: "4px" }}
              />
              <p className="text-left mx-3 my-auto">
                User
                <br />
                Address
              </p>
              <p className="text-right mx-3 my-auto">
                {historyData[0] && `${historyData[0].loser_name}`}
                <br />
                {historyData[0] &&
                  `${historyData[0].loser_addr.substring(
                    0,
                    6
                  )}..${historyData[0].loser_addr.substring(
                    historyData[0].loser_addr.length - 4
                  )}`}
              </p>
            </div>
          </div>
        </div>

        <div className="container d-flex justify-content-center farm-minning__first p-4 my-4">
          <div className="container">
            <p className="m-md-3 my-3 text-info">Game Started by</p>
            <p className="m-3">
              {historyData[0] &&
                `${historyData[0].initialPlayer.substring(
                  0,
                  6
                )}..${historyData[0].initialPlayer.substring(
                  historyData[0].initialPlayer.length - 4
                )}`}
            </p>

            <p className="m-md-3 my-3 text-info">Game Joined by</p>
            <p className="m-3">
              {historyData[0] &&
                `${historyData[0].finalPlayer.substring(
                  0,
                  6
                )}..${historyData[0].finalPlayer.substring(
                  historyData[0].finalPlayer.length - 4
                )}`}
            </p>
          </div>

          {historyData[0] && historyData[0].amount ? (
            <div className="container">
              <p className="m-3 text-danger">Bet Amount</p>
              <p className="m-3">{historyData[0] && historyData[0].amount}</p>

              <p className="m-3 text-danger">Bet Amount</p>
              <p className="m-3">{historyData[0] && historyData[0].amount}</p>
            </div>
          ) : (
            <div className="container">
              <p className="m-3">Bet NFT ID-</p>
              <p className="m-3">
                {historyData[0] && historyData[0].initialNftId}
              </p>

              <p className="m-3">Bet NFT ID-</p>
              <p className="m-3">
                {historyData[0] && historyData[0].finalNftId}
              </p>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
