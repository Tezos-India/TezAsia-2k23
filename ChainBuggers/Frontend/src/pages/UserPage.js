import React, { useState } from "react";
import UserDetails from "../components/UserDetails";
import bg from "../assets/bg.svg";
import MyTickets from "../components/MyTickets";
import MyWallet from "../components/MyWallet";
export default function UserPage(props) {
  const [button, setButton] = useState(1);

  return (
    <div className="h-screen w-full flex justify-start items-start">
      <img className="w-full h-screen object-cover object-center" alt="" src={bg} />
      <div className="w-full absolute z-10">
        <div className="bg-[#1A142F] w-1/4 h-screen">
          <UserDetails
            userData={props.userData}
            button={button}
            setButton={setButton}
          />
        </div>
      </div>
      <div className="w-full absolute z-10">
        <div className="absolute left-1/4 w-3/4">
          {button === 1 ? <MyTickets /> : <MyWallet />}
        </div>
      </div>
    </div>
  );
}
