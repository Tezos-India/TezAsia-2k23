import React,{Fragment,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";
import './Leaderboard.css'

function Leaderboard(props) {
    const [rankData,setRankData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/users?limit=10";
    
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
    const resultData = rankData.filter((data) => data.username !== "zero")
    return (
        <Fragment>
        {loading&&<LoadingSpinner/>}
<div className="logo my-3">
      <h1 className='text-center' style={{color: "#d1996d"}}><b>Leaderboard</b></h1>
</div>
    <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>Rank</p>
            <p>Username</p>
            <p>Points</p>
        </div>

           {resultData.map((data,index)=>(
            <Link to={"/profile/"+data.address}>
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{index+1}</p>
            <p>{data.username}</p>
            <p>{data.rank}</p>
        </div>
            </Link>
            ))}
    </div>
    </Fragment>
    )
}


export default Leaderboard

