import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import ShowDetails from "../components/ShowDetails.js";
import orangeDot from "../assets/orange-circle.png";
import greenDot from "../assets/green-circle.png";

export default function TheatreDetails(props) {
  const navigate = useNavigate()
  // console.log("the", props.theatres);
  return (
    <div className=" w-full h-screen">
      <div className=" px-20 py-6  flex flex-col">
        <div className="text-white capitalize font-semibold  text-[4rem]">
          Movie Theater
        </div>
        <div className=" w-full bg-[#843DC9] p-3 h-[70vh]">
          <div className=" w-full bg-[#242333] h-full">
            <div className="w-full px-2 py-1 border-b-2 border-black">
              <div className="flex flex-row-reverse items-center my-2">
                <div className="text-white mr-16">FAST FILLING</div>
                <div className="mr-2">
                  <img src={orangeDot} />
                </div>
                <div className="text-white mr-5">AVAILABLE</div>
                <div className="mr-2">
                  <img src={greenDot} />
                </div>
              </div>
            </div>
            {props.theatres.map((theatre) => {
              return( 
                <div onClick={()=>{
                  navigate('/seatSelection',{state:{theatre:theatre, movie:props.movie}});
                }}>
                <ShowDetails name = {theatre}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
