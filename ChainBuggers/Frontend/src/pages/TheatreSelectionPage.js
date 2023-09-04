import React from "react";
import { useLocation } from 'react-router-dom';
import bgImg from "../assets/bg.svg";
import MovieBanner from "../components/MovieBanner";
import TheatreDetails from "../components/TheatreDetails";
import LogInPage from "../components/Login";

export default function TheatreSelectionPage(props) {
  const location = useLocation();
  const data = location.state;
  console.log("data", data)
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LogInPage login={props.checkLogin} setLogin={props.setLogin} setSignup={props.setSignup} signup={props.checkSignup} setUserData={props.setUserData}/>
      {/* Background Image */}
      <img className="absolute top-0 w-full h-full object-cover -z-10" src={bgImg} alt="" />

      {/* Content */}
      <div className="relative z-0">
        <MovieBanner  name={data.name} release={data.release} image={data.image} poster={data.poster} />
        <div className="mx-auto mt-10 p-4">
          <TheatreDetails theatres={data.theatreId} movie={data}/>
        </div>
      </div>
    </div>
  );
}
