import React, { useState } from "react";
import Header from "../components/Header";
import bgImg from "../assets/bg.svg";
import CardBase from "../components/CardBase";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LogInPage from "../components/Login";

export default function LandingPage(props) {

  const cardBaseMarginTop = 120;

  return (
    <div className="relative min-h-screen">
      <img className="absolute  top-0 w-full h-full object-cover z-0" src={bgImg} alt="" />

      {/* Content */}
      <div className="relative z-10"> 
      <LogInPage  login={props.checkLogin} setLogin={props.setLogin} setSignup={props.setSignup} signup={props.checkSignup} setUserData={props.setUserData}/>
        <HeroSection />
        <div id="base">
          <CardBase />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
