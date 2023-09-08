import {Fragment,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
 import './ControlledTabs.css'
 import { Tab,Tabs } from 'react-bootstrap';
import blue from '../../assets/market/blue.png'


 function ControlledTabs(props) {
    const [key, setKey] = useState('nft');
    return (
     <div className="container profile p-4">
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="nft" title="NFT Collection">
          
<div className="container market-container py-4">
	<div className="row">
		
    {props.arrayNft&&props.arrayNft.map((data)=>(
    <div className="col-md">
    <Link to={"/market/"+data.assetId}>
   

    <div className="profile-card-6 mx-auto"><img src={data.image} className="img img-responsive"/>
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
        </Tab>
        <Tab eventKey="history" title="Game History">
        <div className="farm-leaderboard container px-4">

        <div className="farm-leaderboard__head mx-auto px-auto">
            <p>GameId</p>
            <p>Winner</p>
            <p>Loser</p>
            <p>Status</p>
        </div>

        {props.arrayWin&&props.arrayWin.map((data)=>(
            <Link to={"/history/"+data.gameId}>
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{`${data.winner_name}`}</p>
            <p>{`${data.loser_name}`}</p>
            <p>Won</p>
        </div></Link>))}

        {props.arrayLost&&props.arrayLost.map((data)=>(
            <div className="farm-leaderboard__content container py-3 px-3 my-4">
            <p className=" farm-leaderboard__content__p1 btn-primary py-1 px-3">{data.gameId}</p>
            <p>{`${data.winner_name}`}</p>
            <p>{`${data.loser_name}`}</p>
            <p>Lost</p>
        </div>))}
       
        </div>
        </Tab>
      </Tabs>
     </div>
    );
  }
  




export default ControlledTabs