import React from "react";
import { useLocation } from "react-router-dom";
import bg from "../assets/bg.svg";
import OrderSummary from "../components/OrderSummary";
import ResellSummary from "../components/ResellSumamary";
import { TezosToolkit } from "@taquito/taquito";

export default function PaymentPage(props) {
  // Create a new instance of TezosToolkit
  

  // Get the data from location state
  const location = useLocation();
  const data = location.state;

  console.log("data", data);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <img className="w-full h-screen object-cover" alt="" src={bg} />
      <div className="absolute z-10 w-6/12 h-1/4 mb-80">
        {data.status === "first" ? (
          <OrderSummary
            seats={data.seats}
            movie={data.movie}
            theatre={data.theatre}
          />
        ) : (
          <ResellSummary />
        )}
      </div>
    </div>
  );
}
