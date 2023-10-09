import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { enterWeeklyOperation } from "../utils/operation";

  const  WeeklyGameCard= ({bidAmount,image,name,deadLine}) => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const deadline = "September , 20, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();    

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  const participate = async() => {
    await enterWeeklyOperation(0);
    navigate("/whac-a-mole", { replace: true })
  }

    return (
    
 <div className=" flex flex-col justify-center align-middle my-2 rounded-lg shadow ">
    
       {/* <div className=""> */}
             <img className="weekly-img" src={image} />
       {/* </div> */}
    <div className="px-5 timer pb-5 flex flex-col items-center my-5 border-gray-200">
        
            <h1 className="font-bold timer-card-heading tracking-tight text-gray-900 dark:text-white m-5"> {name} </h1>
          <div className='card-info flex justify-between w-full'>
            <span>Current Bid: {bidAmount} tez</span>
            <button className='card-participate-btn' onClick={() => participate()}> Participate</button>
          </div>
          <h2 className="font-bold tracking-tight text-gray-900 dark:text-white m-5"> Time Left</h2>

        <div className="flex items-center align-middle justify-center gap-x-3 mt-2.5 mb-5 w-full ">
             <div className="flex flex-col mx-3 my-3 border-gray-200 box-timer ">
                <p id="day">{days < 10 ? "0" + days : days}</p>
                <span className="text">Days</span>
             </div>
            <div className="flex flex-col box-timer">
              <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
              <span className="text">Hours</span>
            </div>
            <div className="flex flex-col box-timer">
             <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
            <span className="text">Minutes</span>
            </div>
           <div className="flex flex-col box-timer">
             <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
            <span className="text">Seconds</span>
            </div>


            </div>
    </div>
</div> 



    );
  }

  export default WeeklyGameCard;