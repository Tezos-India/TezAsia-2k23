import React,{Fragment,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../misc/LoadingSpinner/LoadingSpinner';
import './HistoryBoard.css'
function HistoryBoard(props) {
    const [rankData,setRankData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/games?sort=gameId";
    
        const fetchData = async () => {
          try {
            setLoading(true)
            const response = await fetch(url);
            const json = await response.json();
            setRankData(json)
            console.log(json);
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
<div className="logo my-3">
      <h1 className='text-center' style={{color: "#d1996d"}}><b>History</b></h1>
</div>
<div className="farm-leaderboard container px-4">
<div className="farm-leaderboard__head mx-auto px-auto">
    <p>GameId</p>
    <p>Winner</p>
    <p>Loser</p>
    <p>Bet Type</p>
</div>

{rankData&&rankData.map((data)=>(
    <Link to={"/history/"+data.gameId}>
    <div className="farm-leaderboard__content container py-3 px-3 my-4">
    <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
    <p>{`${data.winner_name}`}</p>
    <p>{`${data.loser_name}`}</p>
    <p>{data.amount?"Token":"NFT"}</p>
</div></Link>))}
</div>
    </Fragment>
    )
}


export default HistoryBoard

