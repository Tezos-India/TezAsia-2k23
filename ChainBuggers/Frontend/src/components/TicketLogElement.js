import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

export default function TicketLogElement(props) {
  return (
    <div className="relative w-full h-1/6 overflow-hidden m-auto mb-4">
      <div className="flex justify-between border-b-2">
        <div className="h-48 bg-white rounded-lg mx-2 my-2 w-36">
          <img src={props.image} alt="" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="font-roboto text-white font-21xl">{props.name}</div>
          <div className="font-roboto text-gray-700 font-5xl">
            {`Monday, 16 December 2023, 14:40, `} 
            <b className="text-white"> Seat no: {props.seat}</b>

</div>
          <div className="flex font-roboto">
            <div className="text-[#9DA8BE] font-21xl">
              <FaLocationDot />
            </div>
            <div className="text-[#9DA8BE] ml-2 font-5xl">PVR, Grand Galada</div>
            <div className="text-[#414A63] ml-2 font-5xl">Show Type</div>
          </div>
        </div>
        <div className="mx-12 my-12 px-12 py-6">
          <button class="px-9 py-3 rounded-md bg-blue-500">
            {props.status}
          </button>
        </div>
      </div>
    </div>
  );
}
