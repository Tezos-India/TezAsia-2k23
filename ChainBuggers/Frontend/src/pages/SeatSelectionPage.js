import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import screen from "../assets/screen.png";
import Seats from "../components/Seats.js";
import MovieBanner from "../components/MovieBanner";
import LogInPage from "../components/Login";

export default function TheaterSeat(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const theatre = location.state.theatre;
  const movie = location.state.movie;
  console.log({theatre, movie})
  const [seats, setSeats] = useState([]);
  // console.log("det", seats);
const token = localStorage.getItem("jwt_token")
const handleBook = () => {
  if(token && seats.length>0){
  navigate('/payment', {state:{seats, movie:movie._id, theatre:theatre._id, status:"first"}})
  }
  if(!token){
    props.setLogin(true);
  }
}

  return (
    <div className="relative z-0">
      <LogInPage login={props.checkLogin} setLogin={props.setLogin} setSignup={props.setSignup} signup={props.checkSignup} setUserData={props.setUserData}/>

      <MovieBanner
        name={movie.name}
        release={movie.release}
        image={movie.image}
        poster={movie.poster}
      />

      <div className=" w-full h-44 bg-[#242333]">
        <div className="text-white capitalize font-semibold  text-[4rem] px-5">
          {theatre.name}
        </div>
      </div>
      <div className=" w-full h-[140vh] bg-[#242333]">
        <div className=" w-full h-full flex flex-col items-center py-10 px-16">
          <div>
            <img src={screen} alt="" />
          </div>
          <div className=" text-white text-3xl mt-10 mb-5">Screen</div>

          <div className=" w-full grid grid-cols-12 my-2">
            <div className=" col-span-12 flex text-white">
              <div>BUDGET-Rs. 250</div>
            </div>
            <div className="w-full col-span-12 border border-gray-50"></div>
            <div className=" col-span-1 text-white">A</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"A-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"A-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"A-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">B</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"B-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"B-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"B-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">C</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"C-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"C-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"C-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">D</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"D-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"D-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"D-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">E</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"E-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"E-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"E-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">F</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"F-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"F-" + (index + 9)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"F-" + (index + 23)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white mt-10">G</div>
            <div className=" col-span-11 w-full mt-10 grid grid-cols-4 gap-1">
              <div className=" flex justify-end mx-8 col-span-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <Seats
                    seatNo={"G-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"G-" + (index + 5)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"G-" + (index + 19)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">H</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex justify-end mx-8 col-span-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <Seats
                    seatNo={"H-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"H-" + (index + 5)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"H-" + (index + 19)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">I</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex justify-end mx-8 col-span-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <Seats
                    seatNo={"I-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"I-" + (index + 5)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"I-" + (index + 19)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">J</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex justify-end mx-8 col-span-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <Seats
                    seatNo={"J-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"J-" + (index + 5)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"J-" + (index + 19)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-12 mt-10 flex text-white">
              <div>ELITE-Rs. 350</div>
            </div>
            <div className=" w-full border col-span-12  border-gray-50"></div>
            <div className=" col-span-1 text-white">K</div>
            <div className=" col-span-11 w-full grid grid-cols-4 gap-1">
              <div className=" flex justify-end mx-8 col-span-1">
                {Array.from({ length: 7 }, (_, index) => (
                  <Seats
                    seatNo={"K-" + (index + 1)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" w-full flex justify-center items-center col-span-2">
                {Array.from({ length: 14 }, (_, index) => (
                  <Seats
                    seatNo={"K-" + (index + 8)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
              <div className=" flex col-span-1">
                {Array.from({ length: 8 }, (_, index) => (
                  <Seats
                    seatNo={"K-" + (index + 22)}
                    seats={seats}
                    setSeats={setSeats}
                  />
                ))}
              </div>
            </div>
            <div className=" col-span-1 text-white">L</div>
            <div className=" col-span-11 w-full flex mx-6">
              {Array.from({ length: 34 }, (_, index) => (
                <Seats
                  seatNo={"L-" + (index + 1)}
                  seats={seats}
                  setSeats={setSeats}
                />
              ))}
            </div>
          </div>
          <div className="my-8">
            <div className="grid grid-rows-2 grid-flow-col gap-7">
              <div className=" flex justify-center items-center">
                <div className=" w-7 h-6 rounded-t-full bg-gray-800"></div>
                <div className=" text-white text-3xl mx-2">Available Seats</div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" w-7 h-6 rounded-t-full bg-green-500"></div>
                <div className=" text-white text-3xl mx-2">Selected Seats</div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" w-7 h-6 rounded-t-full bg-orange "></div>
                <div className=" text-white text-3xl mx-2">Resell Seats</div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" w-7 h-6 rounded-t-full bg-cyan-400">
                  
                </div>
                <div className=" text-white text-3xl mx-2">Sold Seats</div>
              </div>
            </div>
          </div>
          <button className="rounded-full bg-blue-900 my-4">
            <div className="rounded-[20px] [background:linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0)),_rgba(0,_0,_0,_0.14)] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-48 h-16  text-white text-5xl text-center font-noto-sans px-4 py-4" 
            onClick={handleBook}>
              Book now
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
