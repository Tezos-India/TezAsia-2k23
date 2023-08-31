import React, { useState, useEffect,useRef } from "react";

// Components
import Navbar from "./components/Navbar";
import { builtinModules } from "module";
import { startGameOperation, endGameOperation ,BidOperation,retStorage} from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

const App: React.FC = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState<number>(-1);
//  const [tickets, setTickets] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<number>(0);
  const [howmuchtez, settez] = useState<number>(0);

  const [sha, setsha] = useState<number>(0);
  
  
  let d:number;

  
//  let storage; 
  
  
      const fetchData = async () => {
	   let storage = await fetchStorage();
	   d = storage.sha_num;
      
      setPlayers((d));
      //setTickets(storage.tickets_available);
    };
  function Timer() {


  // Set players and tickets remaining
  //useEffect(() => {
   // TODO 9 - Fetch players and tickets remaining from storage

     fetchData();

 // }, []);
 };


  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
/*
const strr = async () => {

	try{
//		setLoading(true);
const d = await retStorage();

	 	//setPlayers(d);
	 	alert("done") 


	  }
	  catch(error){
		  throw error
	  }
	  
	//setLoading(false)
	  
  };*/


  
  
    //const fetchData = async () => {
	  //const storage = await fetchStorage();
      
    //  setPlayers((storage.sha_num));
      //setTickets(storage.tickets_available);
    //};



  // TODO 11.a - Complete onEndGame function
  const onStartGame = async () => {
	  let today  = new Date()
  let time1 : number = today.getMilliseconds()
  let shanum : number= 1 +  (Math.random()*123456789)
  let rannum : number = 1 +  (Math.random()*6)


	try{
//		setLoading(true);
	 	alert("Bet on number between 1 and 6 (if no is greater than 6 it will be mod with 6 ) you can bid any amount(posetive integer) in tez.");

	 	await startGameOperation(rannum,shanum,time1)
	 	alert("done") 
	 		 	ref.current?.scrollIntoView({ behavior: 'smooth' });



	  }
	  catch(error){
		  throw error
	  }
	  
	//setLoading(false)
	  
  };
  
  
    // TODO 7.a - Complete onBuyTicket function
  const onBid = async () => {
	  
	  
  let today  = new Date()
  let time2 : number = today.getMilliseconds()
  //let shanum : number= 1 +  (Math.random()*123456789)
  let rannum : number = 1 +  (Math.random()*6)
	  
	  
	  try{
		  
		setLoading(true);


	 	await BidOperation(rannum,name,howmuchtez,time2)
	 	
	 	
		alert(`you have bet ${howmuchtez} tez on number ${name}`);

	 	//alert("");
	  }
	  catch(error){
		  throw error
	  }

	  setLoading(false)
	  			  ref1.current?.scrollIntoView({ behavior: 'smooth' });

	  
  };
  
  
  
    const onEndGame = async () => {
	        	 		  			  ref2.current?.scrollIntoView({ behavior: 'smooth' });

	  	  try{
		//setLoading(true);
		//fetchData();
	 	alert(" AFTER TRANSACTION PLEASE RESET THE GAME ")

	 	await endGameOperation()
	  //const storage = await fetchStorage();
            	 	Timer();

      setPlayers((d));


	 		 	alert(`	THE CORRECT NUMBER WAS ${d}`)
	 		 	//strr();



	 	//alert("game ended")
	 	//setPlayers(d);

	  }
	  catch(error){
		  throw error
	  }

	  //setLoading(false)
	  
  };
  
  
  
  

  

  return (
    <div className="h-100" style={{textAlign:'center',backgroundImage:
      'url("./mountain.jpg")' ,backgroundRepeat:"no-repeat" }} >
      <Navbar />
      <div ref={ref2} className="d-flex flex-column justify-content-center align-items-center h-100"
      style={{textAlign:'center'}}>
      
       {<label><b>`THE LAST NO WAS : {players}`</b></label>
  }
        {/* Ticket remaining display */}
        
        
          <button   onClick={event => {
onStartGame()


  }}  className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
           {"START GAME" } 
          </button>
          
          

		
        
        


      </div>
 <div ref={ref} className="d-flex flex-column justify-content-center align-items-center h-100"
      style={{textAlign:'center',backgroundImage:
      'url("./mountain2.jpg")' ,backgroundRepeat:"no-repeat"}} >

        

          
          
          <div style={{height:'50px', backgroundColor:'#92A8D1'}} ></div>
        
     <form>
      <label><b>ENTER A NUMBER BETWEEN 1 AND 6   :    </b>
        <input  id="number" 
          type="number" 
          value={name}
          onChange={(e) => setName(e.target.valueAsNumber)} />
      </label>
    </form>
                      <div style={{height:'100px', backgroundColor:'#92A8D1'}} ></div>

    
         <form>
      <label><b>HOW MUCH TEZ DO YOU WANT TO BET:</b> 
        <input  id="howmuch" 
          type="number" 
          value={howmuchtez}
          onChange={(e) => settez(e.target.valueAsNumber)}
           />
      </label>
    </form>
        
                  <div style={{height:'100px', backgroundColor:'#92A8D1'}} ></div>

        {/* Action Buttons */}
        {(
			         
          <button onClick={onBid}  className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            
           {loading ? `Loading`:`BET ON NUMBER ${name}` } 
          </button>
          
        
        )
        //:(
			//<button onClick={endGameOperation} className="btn btn-success btn-lg">
            //{/* TODO 11.b - Call onEndGame on click */}
            //{/* TODO 11.c - Show "loading..." when buying operation is pending */}
           
          // {loading ? "Loading":"End Game" } 
          //</button>
        //)

        }
                  <div style={{height:'100px', backgroundColor:'#92A8D1'}} ></div>

        
			
				

		
        
        


      </div>
      
      
      
     <div ref={ref1} className="d-flex flex-column justify-content-center align-items-center h-100"
      style={{textAlign:'center',backgroundImage:
      'url("./mountain1.jpg")' ,backgroundRepeat:"no-repeat"}}>
      

                  <div style={{height:'100px', backgroundColor:'#92A8D1'}} ></div>

        {
			(
				
		  <button onClick={onEndGame}   className="btn btn-primary btn-lg">
		  
          {"ROLL THE DICE" 
          } 
             

          </button>
          
			)
			
		}
		
        
        


      </div>

      
    </div>
    
  );
};

export default App;
