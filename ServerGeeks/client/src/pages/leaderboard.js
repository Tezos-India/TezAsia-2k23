import React, {useEffect, useState} from "react";
import { useMantineTheme } from "@mantine/core";
import { fetchLeaderboard } from "../utils/tzkt"

function Leaderboard() {
    const theme = useMantineTheme();

    const [data, setData] = useState();

    useEffect(() => {
      (async () => {
        const data = await fetchLeaderboard()
        const array = [];
        Object.keys(data).forEach((key) => {
            array.push({
            address: key,
            wins: data[key].wins,
            score: data[key].score
          })
        });
        console.log(array)
        let sortedArray = array.sort(
          (p1, p2) => (parseInt(p1.score) < parseInt(p2.score)) ? 1 : (parseInt(p1.score) > parseInt(p2.score)) ? -1 : 0);
        console.log(sortedArray);
        setData(sortedArray);
      })()
    }, []);

    return(
        // <div style={{
        //     backgroundColor: theme.colors.red[8]
        // }}>
        <div className="leaderboardPg ">

        
            <div className="leaderContainer">
      <div className="topLeadersList">
        {data && data.map((user, index) => (
          <div className="leader">
            {index + 1 <= 3 && (
              <div className="containerImage">
                <img className="image" 
                  loading="lazy" 
                  src={
                    index % 2 === 0 
                      ? "https://cdn-icons-png.flaticon.com/512/186/186037.png" 
                      : "https://cdn-icons-png.flaticon.com/512/186/186038.png"
                    } 
                  alt="avatar"  
                />
                <div className="crown">
                  <svg
                    id="crown1"
                    fill="#0f74b5"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 50"
                  >
                    <polygon
                      className="cls-1"
                      points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                    />
                  </svg>
                </div>
                <div className="leaderName">{(user.address).slice(0,6) + "..." + (user.address).substr(-3)}</div>
              </div>
            )}
          </div>
        ))}
      </div>

        <div className="playerslist">
          <div className="leaderTable">
              <div>#</div>
              <div>Wallet</div>
              <div>Score</div>
              <div>Game Wins</div>
          </div>
          <div className="list">
            {data && data.map((user, index) => (
              <div className="player">
                <span> {index + 1}</span>
                <div className="user">
                  <img className="image" src="https://cdn-icons-png.flaticon.com/512/186/186037.png" alt="avatar" />
                  <span> {(user.address).slice(0,8) + "..." + (user.address).substr(-4)} </span>
                </div>
                <span> {user.score} </span>
                <span> {user.wins} </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    );
}

export default Leaderboard;