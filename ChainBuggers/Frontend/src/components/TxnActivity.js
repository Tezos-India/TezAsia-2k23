import React from "react";
import down from "../assets/downArr.png";

export default function TxnActivity() {
  return (
    <div>
      <div className="h-20 text-white flex flex-row mx-auto">
        <span className="mx-5">
          <img src={down} alt="" />
        </span>
        <span className="mx-10">Withdraw</span>
        <span className="mx-32">06:24:45 AM</span>
        <span className="mx-16">542</span>
        <span className="mx-5">Pending</span>
      </div>
    </div>
  );
}
