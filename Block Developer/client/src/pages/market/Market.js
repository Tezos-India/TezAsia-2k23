import React, { Fragment, useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Market.css'
import LoadingSpinner from "../../components/misc/LoadingSpinner/LoadingSpinner";

function Market(props) {
    const [nftData,setNftData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const url = "http://polyess-listner.herokuapp.com/nfts";
    
        const fetchData = async () => {
          try {
            setLoading(true)
            const response = await fetch(url);
            const json = await response.json();
            setNftData(json)
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
             <div className="container text-center">

<div className="logo my-3">
      <h1 style={{color: "#d1996d"}}><b>NFT Marketplace</b></h1>
</div>

</div>


<div className="container">
  <div className="row">
    		
{nftData&&nftData.map((data)=>(
    <div className="col-4">

<Link to={"/market/"+data.assetId}>
   

    <div className="profile-card-6 mx-auto mb-5"><img src={data.image} className="img img-responsive"/>
        <div className="profile-name">{data.name}</div>
        <div className="profile-overview">
            <div className="profile-overview">
                <div className="row text-center">
                    <div className="col-xs-4">
                        <h3 className="text-white">{data.attributes.rank}</h3>
                        <p className="text-danger">Rank</p>
                    </div>
                   
                    <div className="col-xs-4">
                    <h3 className="text-white">{data.attributes.country}</h3>
                        <p className="text-danger">COUNTRY</p>
                    </div>

                  
                </div>
            </div>
        </div>
    </div>
</Link>

</div>))}
  </div>
</div>
        </Fragment>
    )
}



export default Market

